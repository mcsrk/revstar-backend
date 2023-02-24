const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./app/models");

dotenv.config();
const app = express();

const corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors("*"));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log("Drop and re-sync db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Revstar Test backend made by Jhon." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
