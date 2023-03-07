const fs = require("fs");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

const homePage = fs.readFileSync(`${__dirname}/home.html`, "utf8");
const aboutPage = fs.readFileSync(`${__dirname}/about.html`, "utf8");
const algoPage = fs.readFileSync(`${__dirname}/index.html`, "utf8");

app.get(["/home", "/"], (req, res) => {
  res.end(homePage);
});

app.get("/about", (req, res) => {
  res.end(aboutPage);
});

app.get("/pathfindingvisualizer", (req, res) => {
  res.end(algoPage);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
