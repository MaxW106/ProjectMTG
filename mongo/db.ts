import { MongoClient, ObjectId, Collection } from "mongodb";
import { mongoUri } from "../secret.json";
import mtg = require("mtgsdk-ts");
const client = new MongoClient(mongoUri);

// types
interface User {
	_id?: ObjectId;
	id: number;
	email: string;
	name: string;
	password: string;
}

interface Deck {
	_id?: ObjectId;
	id: number;
	user_id: number;
	name: string;
	img: string;
	cards: [string, number][]; // [card_name, amount]
}

interface Card {
	_id?: ObjectId;
	name: string;
	img: string;
	cmc: number;
	supertypes?: string[];
	types: string[];
	subtypes?: string[];
	rarity: string;
	id: string;
}

// db variables
let dbUsers: any;
let dbDecks: any;
let dbCards: any;

let users: User[];
let decks: Deck[];

//functions
// connection
const exit = async () => {
	try {
		await client.close();
		console.log("Disconnected from database");
	} catch (error) {
		console.error(error);
	}
	process.exit(0);
};

const connect = async () => {
	try {
		await client.connect();
		console.log("Connected to database");
		dbUsers = client.db("ProjectMTG").collection("Users");
		dbDecks = client.db("ProjectMTG").collection("Decks");
		dbCards = client.db("ProjectMTG").collection("Cards");
		users = await dbUsers.find({}).toArray();
		decks = await dbDecks.find({}).toArray();
		process.on("SIGINT", exit);
	} catch (error) {
		console.error(error);
	}
};

// users
const createUser = async (
	name: string,
	email: string,
	hashedPassword: string
) => {
	let user: User = {
		id: users.length + 1,
		name: name,
		email: email,
		password: hashedPassword,
	};

	if (await dbUsers.findOne({ email: email }))
		throw "email already has an account";
	users.push(user);
	await dbUsers.insertOne(user);
};

const getUsers = () => {
	return users;
};

const getUserByName = (name: string) => {
	let user = users.find((user) => user.name === name);
	if (typeof user === "undefined") throw "user not found";
	return user;
};

// decks
const createDeck = async (user_id: number, name: string) => {
	let newDeck: Deck = {
		id: decks.length + 1,
		user_id: user_id,
		name: name,
		img: "./public/images/deck1.jpeg",
		cards: [],
	};
	decks.push(newDeck);
	await dbDecks.insertOne(newDeck);
};

const getDecks = () => {
	return decks;
};

const getDecksByUserId = (user_id: number) => {
	return decks.filter((deck) => deck.user_id === user_id);
};

const getDeckById = (deck_id: number) => {
	return decks.find((deck) => deck.id === deck_id);
};

// cards
// from api
const getCardsByName = async (card_name: string) => {
	let cards = (await mtg.Cards.where({ name: card_name }))
		.filter((card) => typeof card.multiverseid !== "undefined")
		.map(
			(card) =>
				<Card>{
					name: card.name,
					img: card.imageUrl,
					cmc: card.cmc,
					supertypes: card.supertypes,
					types: card.types,
					subtypes: card.subtypes,
					rarity: card.rarity,
					id: card.id,
				}
		);

	return cards;
};

const getCardByName = async (card_name: string) => {
	let api_card = (await mtg.Cards.where({ name: card_name })).find(
		(card) => card.name === card_name
	);

	if (typeof api_card == "undefined") throw "card not found";

	let card: Card = {
		name: api_card.name,
		img: api_card.imageUrl,
		cmc: api_card.cmc,
		supertypes: api_card.supertypes,
		types: api_card.types,
		subtypes: api_card.subtypes,
		rarity: api_card.rarity,
		id: api_card.id,
	};

	return card;
};

const getRandomCards = async (amount: number) => {
	let cards = (await mtg.Cards.where({ random: true, pageSize: amount }))
		.map(
			(card) =>
				<Card>{
					name: card.name,
					img: card.imageUrl,
					cmc: card.cmc,
					supertypes: card.supertypes,
					types: card.types,
					subtypes: card.subtypes,
					rarity: card.rarity,
					id: card.id,
				}
		)
		.filter((card) => typeof card.img !== "undefined");

	if (cards.length < amount) {
		cards.push(...(await getRandomCards(amount - cards.length)));
	}

	return cards;
};

// from db
const getCardsFromDeck = async (deck_id: number): Promise<[Card, number][]> => {
	let deck = getDeckById(deck_id);
	let cards: [Card, number][] = [];

	if (typeof deck === "undefined") throw "deck not found";

	for (let cardOfDeck of deck.cards) {
		await dbCards
			.findOne({ name: cardOfDeck[0] })
			.then((card: Card) => cards.push([card, cardOfDeck[1]]));
	}

	return cards;
};

// deck alterations
const addCardToDeck = async (card_name: string, deck_id: number) => {
	let deck = getDeckById(deck_id);

	if (typeof deck === "undefined") return;

	for (let card of deck.cards) {
		if (card[0] == card_name) {
			card[1]++;
			await dbDecks.updateOne(
				{ id: deck_id },
				{ $set: { cards: deck.cards } }
			);
			return;
		}
	}

	deck.cards.push([card_name, 1]);
	await dbDecks.updateOne({ id: deck_id }, { $set: { cards: deck.cards } });
	if ((await dbCards.findOne({ name: card_name })) == null)
		await dbCards.insertOne(await getCardByName(card_name));
};

export {
	connect,
	createUser,
	getUsers,
	getUserByName,
	createDeck,
	getDecks,
	getDecksByUserId,
	getDeckById,
	User,
	Deck,
};
