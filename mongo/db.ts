import { MongoClient, ObjectId, Collection } from "mongodb";
import { Card } from "mtgsdk-ts";
const secret = require("../secret.json");
const client = new MongoClient(secret.mongoUri);

interface User {
	_id?: ObjectId;
	email: string;
	name: string;
	password: string;
	decks: Deck[];
}

interface Deck {
	_id?: ObjectId;
	name: string;
	cards: number[];
}

let users: User[] = [
	{ name: "Artjom", email: "artjom@gmail.com", password: "test", decks: [] },
	{ name: "Daniel", email: "Daniel@gmail.com", password: "test", decks: [] },
	{ name: "Max", email: "Max@gmail.com", password: "test", decks: [] },
	{ name: "Bilal", email: "Bilal@gmail.com", password: "test", decks: [] },
];

const main = async () => {
	try {
		await client.connect();
		let userCollection = await client.db("ProjectMTG").collection("Users");
		let deckCollection = await client.db("ProjectMTG").collection("Decks");
		//await userCollection.insertMany(users);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
};

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

const createUser = async (
	name: string,
	email: string,
	hashedPassword: string
) => {
	let user: User = {
		name: name,
		email: email,
		password: hashedPassword,
		decks: [],
	};

	if (
		await client
			.db("ProjectMTG")
			.collection("Users")
			.findOne({ email: email })
	)
		throw "email already has an account";
	await client.db("ProjectMTG").collection("Users").insertOne(user);
};

export { main, connect, createUser, User };
