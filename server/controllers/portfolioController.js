const fs = require('fs');
const path = require('path');

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
    console.log(updatedPortfolio);
    fs.writeFileSync(path.resolve(__dirname, '../database/portfolio.dev.json'), JSON.stringify(updatedPortfolio, null, 2));
  //   if (!portfolio) {
  //     return next({
  //       log: 'fileController.getCharacters: ERROR: Error getting characters data from characters.json file',
  //       message: { err: 'Error occurred in fileController.getCharacters. Check server logs for more details.' },
  //     });
  //   }
    return next();
};

// EXPORT THE CONTROLLER 
module.exports = portfolioController;