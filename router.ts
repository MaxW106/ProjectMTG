import express from "express";
const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.listen(app.get("port"), () => {
    console.log(
        `Web application running at http://localhost:${app.get("port")}`
    );
});
