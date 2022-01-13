const express = require('express');

const userpageController = require('../controllers/userpageController');
const portfolioController = require('../controllers/portfolioController');
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.post('/signup',
    userpageController.signup,
    portfolioController.createPortfolio,
    cookieController.setUserIDCookie,
    sessionController.startSession,
    (req, res) => res.status(200).json(res.locals.portfolio)
);

router.put('/login',
    userpageController.login,
    portfolioController.getUserPortfolio,
    cookieController.setUserIDCookie,
    sessionController.startSession,
    (req, res) => res.status(200).json(res.locals.portfolio)
);


module.exports = router;