const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
require("module-alias/register");

// Databse Instance
const db = require("models");

// Routes
const companyRoutes = require("routes/company.routes");
const inventoryRoutes = require("routes/inventory.routes");
const productRoutes = require("routes/product.routes");
const userRoutes = require("routes/user.routes");

const app = express();
dotenv.config();

const corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors("*"));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
	// .sync({ force: true })
	.sync()
	.then(() => {
		console.log("Drop and re-sync db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

// Initial Route
app.get("/", (req, res) => {
	res.json({ message: "Revstar Test backend made by Jhon." });
});

// Routes
app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", productRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
