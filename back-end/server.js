// npm i express
// npm i axios just cuz
// npm i mongoose
// npm i cors

// cors allows anyone to access the api
// key = origin, example.com
// Access-Control-Allow-Origin | *
// const cors = require("cors");

const express = require("express");
const moviesController = require("./controller/movies.js");

const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const db = mongoose.connection;
const mongoURI = "mongodb://0.0.0.0:27017/movies";

// change to /movies as default route name
app.use("/movies", moviesController);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// Connect to Mongo
mongoose.connect(mongoURI, () => {
  console.log("The connection with mongod is established");
});

db.once("open", () => {
  console.log("Connected to mongod ...");
});

app.listen(PORT, () => {
  console.log("Listening....");
});
