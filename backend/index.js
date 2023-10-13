const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// for https
const https = require("https");
const fs = require("fs");
const app = express();

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

if (process.env.NODE_ENV === "development") {
	require("dotenv").config({ path: "./.env" });
}

if (process.env.NODE_ENV === "production") {
	require("dotenv").config({ path: "./.env.production" });
}

app.use(express.json());

console.log("using cors to permit Access-control-allow-=origin. client url: ", process.env.CLIENT_URL);
app.use(
	cors({
		origin: process.env.CLIENT_URL, // Allow CORS from your client's origin
		credentials: true, // Allow cookies to be included in requests
	}),
);

app.use(cookieParser());

// const {sequelize} = require("./db");
const { sequelize } = require("./db/models");

app.get("/", async (req, res) => {
	console.log("backend reached");

	sequelize
		.authenticate()
		.then(() => {
			res.send("authenticated db successfully");
			console.log("Connection has been established successfully.");
		})
		.catch((err) => {
			res.send(`issue with db auth ${err}`);

			console.error("Unable to connect to the database:", err);
		});
});

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const sheetRoutes = require("./routes/sheetRoutes");
app.use("/sheets", sheetRoutes);

const participantSheetItemRoutes = require("./routes/participantSheetItemRoutes");
app.use("/participantSheetItems", participantSheetItemRoutes);

const participantRoutes = require("./routes/participantRoutes");
app.use("/participants", participantRoutes);

const port = process.env.PORT || "4000";

const server = https.createServer({ key: key, cert: cert }, app);

server.listen(port, async () => {
	console.log(`[server]: Server is running at https://localhost:${port}`);

	let isConnected = false;
	let attempts = 0;

	while (!isConnected && attempts < 10) {
		try {
			await sequelize.authenticate();
			console.log("Connection has been established successfully.");
			isConnected = true;
		} catch (err) {
			console.error("Unable to connect to the database:", err);
			attempts++;
			// Wait for 1 second before trying again
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}
});
// redirect the user to the home page, along with the access token
