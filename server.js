const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

require("module-alias/register");

// Databse Instance
const db = require("models");

// Routes
const publicRoutes = require("routes/public.routes");

const companyRoutes = require("routes/company.routes");
const inventoryRoutes = require("routes/inventory.routes");
const productRoutes = require("routes/product.routes");
const userRoutes = require("routes/user.routes");
const listEndpoints = require("express-list-endpoints");

const { validateAuth } = require("middelware/JWTAuth");

dotenv.config();

const app = express();

app.use(cors("*"));
// Parse requests of content-type - application/json
app.use(express.json());

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

// Public endpoints

app.use("/api", publicRoutes);
app.use(validateAuth);
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
