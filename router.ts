import express from "express";
import mtg from "mtgsdk-ts";
import { MongoClient, ObjectId } from "mongodb";
import { main, connect, createUser, User } from "./mongo/db";
const path = require("path");
const app = express();

import db from "./db.json";

let pages_logged_in = ["home", "decks", "drawtest", "login"];
let pages_not_logged_in = ["home", "login"];

app.set("port", 3000);
app.set("view engine", "ejs");

connect();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("landingpage");
});

app.get("/home", (req, res) => {
	res.type("html");
	let searchString = req.query.searchString as string;
	if (!searchString) searchString = "";
	let cards: any[] = [];
	if (searchString !== "") {
		cards = db.cards.filter((card, index, array) => {
			return card.name.toLowerCase().includes(searchString.toLowerCase());
		});
	}
	if (cards.length == 0) {
		cards = db.cards.slice(0, 10);
	}

	res.render("home", {
		pages: pages_logged_in,
		cards: cards,
		searchString: searchString,
	});
});
app.get("/decks", (req, res) => {
	res.render("decks", { pages: pages_logged_in });
});

app.get("/drawtest", (req, res) => {
	res.render("drawtest", { pages: pages_logged_in });
});

app.get("/login", (req, res) => {
	res.render("login", { pages: pages_logged_in });
});

let securePassword: string;
app.get("/register", (req, res) => {
	res.render("register", {
		securePassword: securePassword,
		pages: pages_logged_in,
	});
});

app.post("/register", async (req, res) => {
	try {
		await createUser(
			req.body.name as string,
			req.body.email as string,
			req.body.password as string
		);
		res.render("register", { emailTaken: false, pages: pages_logged_in });
	} catch (e) {
		console.log(e);
		res.render("register", {
			emailTaken: true,
			pages: pages_not_logged_in,
		});
	}
});


app.get("/deck", (req, res) => {
	let number = req.query.number as string;
	if (!number) number = "0";
	let i = parseInt(number);
	res.render("deck_view", { pages: pages_logged_in, deck: db.decks[i] });
});

app.get("/*", (req, res) => {
	res.status(404);
	res.render("404", { pages: pages_logged_in });
});

app.listen(app.get("port"), () => {
	console.log(
		`Web application running at http://localhost:${app.get("port")}`
	);
});
