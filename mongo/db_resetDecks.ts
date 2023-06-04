import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../secret.json";

const client = new MongoClient(mongoUri);

interface Deck {
	_id?: ObjectId;
	id: number;
	user_id: number;
	name: string;
	img: string;
	cards: number[];
}

let counter = 1;

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
		process.on("SIGINT", exit);
	} catch (error) {
		console.error(error);
	}
};

const clearDecks = async () => {
	await client.db("ProjectMTG").collection("Decks").deleteMany({});
	console.log("Decks deleted");
};

const createDeck = async (user_id: number, name: string) => {
	let newDeck: Deck = {
		id: counter++,
		user_id: user_id,
		name: name,
		img: "/images/deck1.jpeg",
		cards: [],
	};
	await client.db("ProjectMTG").collection("Decks").insertOne(newDeck);
};

const main = async () => {
	await connect();
	await clearDecks();
	console.log("all decks removed");

	for (let i = 1; i <= 4; i++) {
		await createDeck(i, `testdeck${i}`);
		console.log(`Deck ${i} added`);
	}
	await exit();
};

main();
