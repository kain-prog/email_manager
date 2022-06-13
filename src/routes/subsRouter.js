const express = require('express');
const { handleSubscribers, getSubscribers, getOnlyActiveSubscribers } = require('../controllers/subsControllers');

const router = express.Router();

router.get('/', getSubscribers);
router.get('/active', getOnlyActiveSubscribers);
router.post('/', handleSubscribers);

module.exports = router;