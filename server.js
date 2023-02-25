const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("module-alias/register");

// Databse Instance
const db = require("models");

// Routes
const companyRoutes = require("routes/company.routes");
const inventoryRoutes = require("routes/inventory.routes");
const productRoutes = require("routes/product.routes");
const userRoutes = require("routes/user.routes");
const listEndpoints = require("express-list-endpoints");

dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";
const app = express();

const corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors("*"));
app.use(cookieParser());
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

// Routes
app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", productRoutes);

// List all endpoints Initial Route
app.use("/", (_, res) => {
	const endpoints = listEndpoints(app)
		.map(
			(endpoint) =>
				`${endpoint.methods.join(", ")} <a href="http://localhost:${PORT}${endpoint.path}">${endpoint.path}</a>`
		)
		.join("\n");
	res.send(`<pre>${endpoints}</pre>`);
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
