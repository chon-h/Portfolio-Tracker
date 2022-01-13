const express = require('express');

const userpageController = require('../controllers/userpageController');

const router = express.Router();

router.post('/signup',
    userpageController.signup,
    // portfolioController.updatePrices,
    (req, res) => res.status(200).json(res.locals.id)
);

router.put('/login',
    userpageController.login,
    // portfolioController.updatePrices,
    (req, res) => res.status(200).json(res.locals.id)
);


module.exports = router;