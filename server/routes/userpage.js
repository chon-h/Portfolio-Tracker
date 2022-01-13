const express = require('express');

const userpageController = require('../controllers/userpageController');
const portfolioController = require('../controllers/portfolioController');
const cookieController = require('../controllers/cookieController')

const router = express.Router();

router.post('/signup',
    userpageController.signup,
    portfolioController.createPortfolio,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals.portfolio)
);

router.put('/login',
    userpageController.login,
    portfolioController.getUserPortfolio,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals.portfolio)
);


module.exports = router;