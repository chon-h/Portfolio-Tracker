const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Portfolio = require('../models/portfolioModel');

const portfolioController = {};


// portfolioController.getPortfolio = (req, res, next) => {
//   const portfolio = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/portfolio.dev.json'), 'UTF-8'));
//   //   if (!portfolio) {
//   //     return next({
//   //       log: 'fileController.getCharacters: ERROR: Error getting characters data from characters.json file',
//   //       message: { err: 'Error occurred in fileController.getCharacters. Check server logs for more details.' },
//   //     });
//   //   }
//   res.locals.portfolio = portfolio;
//   return next();
// };

portfolioController.updatePortfolio = (req, res, next) => {
  const userID = req.cookies.userID;
  const { stocks, realizedGain } = req.body;
  Portfolio.findOneAndUpdate({ 'userID': userID }, { 'stocks': stocks, 'realizedGain': realizedGain }, { upsert: true, new: true })
    .then((response) => {
      // console.log(response);
      next();
    })
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Bad');
    });
};

portfolioController.updatePrices = async (req, res, next) => {
  for (const key in res.locals.portfolio.stocks) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${key}&apikey=S2X573W01BT65SFA`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        const lastestDate = data['Meta Data']['3. Last Refreshed'];
        const latestPrice = data['Time Series (Daily)'][lastestDate]['4. close'];
        res.locals.portfolio.stocks[key].price = Number(latestPrice);
      });
  }
  // console.log(res.locals.portfolio);
  return next();
};

portfolioController.resetDatabase = async (req, res, next) => {
  const userID = req.cookies.userID;
  const emptyDatabase = {
    "stocks": {},
    "realizedGain": 0
  };
  Portfolio.findOneAndUpdate({ 'userID': userID }, emptyDatabase, { upsert: true, new: true })
    .then((response) => {
      // console.log(response);
      next();
    })
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Bad');
    });
};

portfolioController.createPortfolio = async (req, res, next) => {

  const portfolioDoc = {
    userID: res.locals.id,
    stocks: {},
    realizedGain: 0,
  }

  Portfolio.create(portfolioDoc)
    .then((response) => {
      //  Store the newly generated portfolio in locals
      res.locals.portfolio = { stocks: response.stocks, realizedGain: response.realizedGain };
      next();
    })
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Bad');
    });
};

portfolioController.getUserPortfolio = async (req, res, next) => {
  if (res.locals.id === undefined){
    res.locals.id = req.cookies.userID;
  }
  Portfolio.findOne({ 'userID': res.locals.id })
    .then((response) => {
      //  Store the newly generated portfolio in locals
      res.locals.portfolio = { stocks: response.stocks, realizedGain: response.realizedGain };
      next();
    })
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Bad');
    });
};


// EXPORT THE CONTROLLER 
module.exports = portfolioController;