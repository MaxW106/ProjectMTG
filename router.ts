import express from "express";
const validator = require("email-validator");
const path = require("path");

import {
	connect,
	createUser,
	getUsers,
	getUserByName,
	createDeck,
	getDecks,
	getDecksByUserId,
	getDeckById,
	getCardByName,
	getCardsByName,
	getRandomCards,
	getCardsFromDeck,
	addCardToDeck,
	User,
	Deck,
	Card,
} from "./mongo/db";
import db from "./db.json";

// express setup
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("port", 3000);
app.set("view engine", "ejs");

// db setup
connect();

// other setup
let pages = ["home", "decks", "drawtest", "login"];
let currentUser: User | undefined;

// routes
app.get("/", (req, res) => {
	res.render("landingpage");
});

app.get("/home", async (req, res) => {
	res.type("html");

	let searchString = (req.query.searchString as string) ?? "";
	let cardPage = parseInt((req.query.cardPage as string) ?? "1");

	let cards: Card[] = [];
	if (searchString !== "") {
		cards = (await getCardsByName(searchString)).slice(
			(cardPage - 1) * 10,
			cardPage * 10
		);
	}
	if (cards.length == 0) {
		cards = await getRandomCards(10);
	}

	res.render("home", {
		pages: pages,
		cards: cards,
		searchString: searchString,
		cardPage: cardPage,
	});
});

app.get("/decks", async (req, res) => {
	if (typeof currentUser == "undefined") {
		res.redirect("login");
		return;
	}

	let decks = getDecksByUserId(currentUser.id);

	res.render("decks", { pages: pages, decks: decks });
});

app.get("/deck", async (req, res) => {
	let deckId = parseInt((req.query.id as string) ?? "1");
	if (typeof currentUser === "undefined") {
		res.redirect("home");
		return;
	}
	let decksOfUser = getDecksByUserId(currentUser.id);

	if (!decksOfUser.find((deck) => deck.id == deckId)) {
		res.redirect("decks");
		return;
	}

	res.render("deck_view", {
		pages: pages,
		deck: getDeckById(deckId),
		cards: await getCardsFromDeck(deckId),
	});
});

app.get("/drawtest", async (req, res) => {
	let deck = getDeckById(1);
	let cards = await getCardsFromDeck(1);
	res.render("drawtest", { pages: pages, deck: deck, cards: cards });
});

app.get("/login", (req, res) => {
	res.render("login", { pages: pages, triedToLogin: false });
});

app.post("/login", async (req, res) => {
	try {
		let givenUsername = req.body.username;
		let givenPassword = req.body.password;
		let user = getUserByName(givenUsername);
		let password = user.password;
		if (password == givenPassword) {
			currentUser = user;
			res.redirect("home");
		} else {
			res.render("login", {
				pages: pages,
				triedToLogin: true,
			});
		}
	} catch (e) {
		console.error(e);
		res.redirect("/404");
	}
});

app.get("/logout", async (req, res) => {
	currentUser = undefined;
	res.redirect("home");
});

app.post("/logout", async (req, res) => {
	currentUser = undefined;
	res.redirect("home");
});

app.get("/register", (req, res) => {
	res.render("register", {
		pages: pages,
		triedToRegister: false,
		triedToRegisterMail: false,
	});
});

app.post("/register", async (req, res) => {
	try {
		if (req.body.password != req.body.securePassword) {
			res.render("register", {
				pages: pages,
				triedToRegister: true,
				triedToRegisterMail: false,
			});
		} else if (!validator.validate(req.body.email)) {
			res.render("register", {
				pages: pages,
				triedToRegister: false,
				triedToRegisterMail: true,
			});
		} else if (
			validator.validate(req.body.email) &&
			req.body.password == req.body.securePassword
		) {
			await createUser(
				req.body.username as string,
				req.body.email as string,
				req.body.password as string
			);
			res.render("drawtest", {
				emailTaken: false,
				pages: pages,
				triedToRegister: false,
				triedToRegisterMail: false,
			});
		}
	} catch (e) {
		console.log(e);
		res.render("register", {
			emailTaken: true,
			pages: pages,
			triedToRegister: false,
			triedToRegisterMail: false,
		});
	}
});

app.get("/500", (req, res) => {
	res.status(500);
	res.render("500", { pages: pages });
});

app.get("/*", (req, res) => {
	res.status(404);
	res.render("404", { pages: pages });
});

app.listen(app.get("port"), () => {
	console.log(
		`Web application running at http://localhost:${app.get("port")}`
	);
});
