// userRoutes.js
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController');

// Define your routes here
router.get('/', controllers.getUsers);
router.post("/", controllers.createUser);

router.get("/:id", controllers.getUserById);
// Export the router
module.exports = router;