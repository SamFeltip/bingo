const express = require("express");
const router = express.Router();
const controllers = require("../controllers/authController");

router.get("/", (req, res) => {
	res.send("auth root");
});

router.post("/getAccessToken", controllers.getAccessToken);

router.post("/deleteSessionCookie", controllers.deleteSessionCookie);

router.get("/getUserData", controllers.getUserData);

module.exports = router;
