import { MongoClient, ObjectId } from "mongodb";
import { mongoUri } from "../secret.json";

const client = new MongoClient(mongoUri);

interface User {
	_id?: ObjectId;
	id: number;
	email: string;
	name: string;
	password: string;
}

let basicUsers: User[] = [
	{ id: 1, name: "Artjom", email: "artjom@gmail.com", password: "test" },
	{ id: 2, name: "Daniel", email: "daniel@gmail.com", password: "test" },
	{ id: 3, name: "Max", email: "max@gmail.com", password: "test" },
	{ id: 4, name: "Bilal", email: "bilal@gmail.com", password: "test" },
];

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

const clearUsers = async () => {
	await client.db("ProjectMTG").collection("Users").deleteMany({});
	console.log("Users deleted");
};

const addBasicUsers = async () => {
	await client.db("ProjectMTG").collection("Users").insertMany(basicUsers);
	console.log("Basic users added");
};

const resetUsers = async () => {
	await clearUsers();
	await addBasicUsers();
};

const main = async () => {
	await connect();
	await resetUsers();
	await exit();
};

main();
