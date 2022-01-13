const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const portfolioController = {};


portfolioController.getPortfolio = (req, res, next) => {
  const portfolio = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/portfolio.dev.json'), 'UTF-8'));
  //   if (!portfolio) {
  //     return next({
  //       log: 'fileController.getCharacters: ERROR: Error getting characters data from characters.json file',
  //       message: { err: 'Error occurred in fileController.getCharacters. Check server logs for more details.' },
  //     });
  //   }
  res.locals.portfolio = portfolio;
  return next();
};

portfolioController.updatePortfolio = (req, res, next) => {
  const updatedPortfolio = req.body;
  // console.log(updatedPortfolio);
  fs.writeFileSync(path.resolve(__dirname, '../database/portfolio.dev.json'), JSON.stringify(updatedPortfolio, null, 2));
  //   if (!portfolio) {
  //     return next({
  //       log: 'fileController.getCharacters: ERROR: Error getting characters data from characters.json file',
  //       message: { err: 'Error occurred in fileController.getCharacters. Check server logs for more details.' },
  //     });
  //   }
  return next();
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
  const emptyDatabase = {
    "stocks": {},
    "realizedGain": 0
  };
  fs.writeFileSync(path.resolve(__dirname, '../database/portfolio.dev.json'), JSON.stringify(emptyDatabase, null, 2))
  return next();
};

// EXPORT THE CONTROLLER 
module.exports = portfolioController;