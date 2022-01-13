const express = require('express');

const portfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.get('/',
    portfolioController.getPortfolio,
    // portfolioController.updatePrices,
    (req, res) => res.status(200).json(res.locals.portfolio)
);

router.put('/',
    portfolioController.updatePortfolio,
    (req, res) => res.sendStatus(200)
);

router.get('/update',
    portfolioController.getPortfolio,
    portfolioController.updatePrices,
    (req, res) => res.status(200).json(res.locals.portfolio)
);

module.exports = router;