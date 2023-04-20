import express from "express";
const path = require("path");
const app = express();

import db from "./db.json";
let pages_logged_in = ["home", "decks", "drawtest"];
let pages_not_logged_in = ["home"];

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.redirect("/home");
});

app.get("/home", (req, res) => {
	res.type("html");

	let searchString = req.query.searchString as string;

	let cards: any[] = [];

	if (searchString !== "") {
		cards = db.cards.filter((card, index, array) => {
			return card.name.toLowerCase().includes(searchString);
		});
	}
	if (cards.length == 0) {
		cards = db.cards.slice(0, 10);
	}


	res.render("home", { pages: pages_logged_in, cards: cards });
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

app.get("/*", (req, res) => {
	res.status(404);
	res.render("404", { pages: pages_logged_in });
});

app.listen(app.get("port"), () => {
	console.log(
		`Web application running at http://localhost:${app.get("port")}`
	);
});
