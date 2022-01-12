const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

//  Parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Serve static files(bundle.js)
app.use('/', express.static(path.join(__dirname, '../dist')));

//  response to get on main page with the index html
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

//  response to get request on portfolio 
// app.use('/portfolio', portfolioRouter, (req, res) =>{
//   return res.status(200)
// })

//  listen to PORT
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
