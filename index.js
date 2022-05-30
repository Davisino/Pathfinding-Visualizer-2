const fs = require("fs");
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

const homePage = fs.readFileSync(`${__dirname}/index.html`, "utf8");

app.get("/", (req, res) => {
  res.end(homePage);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
