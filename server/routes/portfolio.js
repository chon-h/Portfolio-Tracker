const express = require('express');

const portfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.get('/',
    portfolioController.getPortfolio,
    (req, res) => res.status(200).json(res.locals.portfolio)
);

router.put('/',
    portfolioController.updatePortfolio,
    (req, res) => res.sendStatus(200)
);

module.exports = router;