import express from "express";
import session from "express-session";
import mtg from "mtgsdk-ts";
import { MongoClient, ObjectId, Collection } from "mongodb";
const secret = require("./secret.json");
const client = new MongoClient(secret.mongoUri);
import { main, connect, createUser, checkPassword, User } from "./mongo/db";
const path = require("path");
const app = express();

const SESSION_SECRET = Buffer.from(require("os").userInfo().username).toString(
	"base64"
);

import db from "./db.json";
import { name } from "ejs";
import { error } from "console";

let pages_logged_in = ["home", "decks", "drawtest", "login"];
let pages_not_logged_in = ["home", "login"];

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

/*
app.use((req, res, next) => {
	res.locals.user = req.session.user;
});
*/
connect();

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
	res.render("login", { pages: pages_logged_in, triedToLogin: false });
});
app.post("/login", async (req, res) => {
	try {
		client.connect();
		let username = req.body.username;
		let psw = req.body.password;
		let user = await client
			.db("ProjectMTG")
			.collection("Users")
			.findOne({ name: username });
		let pass = user?.password;
		if (pass == psw) {
			res.redirect("home");
		} else {
			res.render("login", {
				pages: pages_not_logged_in,
				triedToLogin: true,
			});
		}
	} catch (e) {
		console.error(e);
	}
});

app.get("/register", (req, res) => {
	res.render("register", {
		pages: pages_logged_in,
		triedToRegister: false,
	});
});

app.post("/register", async (req, res) => {
	try {
		if (req.body.password == req.body.securePassword) {
			await createUser(
				req.body.username as string,
				req.body.email as string,
				req.body.password as string
			);
			res.render("register", {
				emailTaken: false,
				pages: pages_logged_in,
			});
		} else {
			res.render("register", {
				pages: pages_not_logged_in,
				triedToRegister: true,
			});
		}
	} catch (e) {
		console.log(e);
		res.render("register", {
			emailTaken: true,
			pages: pages_not_logged_in,
		});
	}

	console.log((req.body.email as string) ?? "");
	res.render("register", { pages: pages_logged_in });
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
