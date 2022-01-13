const express = require('express');

const userpageController = require('../controllers/userpageController');
const portfolioController = require('../controllers/portfolioController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.put('/', 
    sessionController.lookUpSession,
    (req, res) => res.sendStatus(200)
)


module.exports = router;