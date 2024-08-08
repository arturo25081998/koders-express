const express = require("express");
const fs = require("fs");
const server = express();
const dbName = "koders.json";
const port = 8080;

function init() {
  const dbExist = fs.existsSync(dbName);
  if (!dbExist) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf-8");
  }
}

function setKoders(koders) {
  fs.writeFileSync(dbName, JSON.stringify(koders), "utf-8");
}

init();
const readDataBase = () => {
  let userData = JSON.parse(fs.readFileSync(dbName, "utf8"));
  return userData;
};

server.get("/koders", (request, response) => {
  let koders = readDataBase();
  response.json(koders);
});

server.post("/koders/:name", (request, response) => {
  const name = request.params.name;
  let koders = readDataBase();
  koders.push(name);
  setKoders(koders);
  response.status(201).json(koders);
});

server.delete("/koders/:name", (request, response) => {
  const name = request.params.name.toLowerCase();
  let koders = readDataBase();
  koders = koders.filter((koder) => koder.toLowerCase() !== name);
  setKoders(koders);
  response.json(koders);
});

server.delete("/koders", (request, response) => {
  setKoders(JSON.stringify([]));
  let koders = readDataBase();
  response.status(410).json(koders);
});

server.listen(port, () => {
  //console.log("Server is running with express in 8080 port");
});
