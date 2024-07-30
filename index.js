const express = require("express");
const server = express();
const dbName = "koders.json";
const fs = require("fs");
const { request } = require("http");

function init() {
  const dbExist = fs.existsSync(dbName);
  if (!dbExist) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf-8");
  }
}

init();
const readDataBase = () => {
  let userData = fs.readFileSync(dbName, "utf8");
  return userData;
};

server.get("/koders", (request, response) => {
  let koders = JSON.parse(readDataBase());
  response.json(koders);
});

server.post("/koders/:name", (request, response) => {
  const name = request.params.name;
  let koders = JSON.parse(readDataBase());
  koders.push(name);
  fs.writeFileSync(dbName, JSON.stringify(koders), "utf-8");
  response.json(koders);
});

server.delete("/koders/:name", (request, response) => {
  const name = request.params.name.toLowerCase();
  let koders = JSON.parse(readDataBase());
  koders = koders.filter((koder) => koder.toLowerCase() !== name);
  fs.writeFileSync(dbName, JSON.stringify(koders), "utf-8");
  response.json(koders);
});

server.delete("/koders", (request, response) => {
  fs.writeFileSync(dbName, JSON.stringify([]), "utf-8");
  let koders = JSON.parse(readDataBase());
  response.json(koders);
});

server.listen(8080, () => {
  console.log("Server is running with express in 8080 port");
});
