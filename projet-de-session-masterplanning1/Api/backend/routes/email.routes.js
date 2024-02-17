const express = require('express');
const {envoyerEmail} = require('../controllers/email.controller');
const router = express.Router();

router.post('/envoyer-email', envoyerEmail);

module.exports = router;