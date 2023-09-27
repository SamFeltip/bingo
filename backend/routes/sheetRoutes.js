// userRoutes.js
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/sheetController');

// Define your routes here
router.get('/', controllers.getSheets);
router.post("/", controllers.createSheet);
router.get("/:id", controllers.getSheetById);
// Export the router
module.exports = router;