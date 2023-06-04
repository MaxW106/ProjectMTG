import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "./secret.json";

const client = new MongoClient(mongoUri);

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

const clearCards = async () => {
	await client.db("ProjectMTG").collection("Cards").deleteMany({});
	console.log("Cards deleted");
};

const main = async () => {
	await connect();
	await clearCards();
	await exit();
};

main();
