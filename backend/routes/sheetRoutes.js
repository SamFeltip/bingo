// userRoutes.js
const express = require("express");
const controllers = require("../controllers/sheetController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

// Define your routes here
router.get("/", controllers.getSheets);
router.post("/", controllers.createSheet);
router.get("/:sheet_id", controllers.getSheetById);
// Export the router
module.exports = router;
