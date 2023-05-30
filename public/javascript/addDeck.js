import { ObjectId } from "mongodb";
import { User } from "../../mongo/db";

const addDeck = async (user) => {
	user.decks.push({ name: "", cards: [] });
};
