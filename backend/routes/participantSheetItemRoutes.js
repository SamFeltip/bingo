const express = require('express');
const controllers = require('../controllers/participantSheetItemController');
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth)

// Define your routes here
router.patch('/:psi_id', controllers.toggleCheckedPSI);
router.post('/:participant_id', controllers.createNewPSI);
// Export the router
module.exports = router;