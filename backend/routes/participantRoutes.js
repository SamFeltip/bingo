const express = require('express');
const controllers = require('../controllers/participantController');
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth)

// Define your routes here
router.post('/', controllers.createParticipant);
router.delete('/', controllers.deleteParticipant);
router.get('/', controllers.getParticipant)
// Export the router
module.exports = router;