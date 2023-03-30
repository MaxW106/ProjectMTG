import express from "express";
const app = express();

let pages_logged_in = ["home", "decks", "drawtest"];
let pages_not_logged_in = ["home"];

app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("home");
});

app.get("/home", (req, res) => {
    res.render("home");
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
