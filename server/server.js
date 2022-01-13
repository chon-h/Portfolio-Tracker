const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const portfolioRouter = require('./routes/portfolio');
const userpageRouter = require('./routes/userpage');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb+srv://chonh226:Kcgopk226@cluster0.xwolc.mongodb.net/soloproject?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {dbName: 'soloproject'});

//  Parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Serve static files(bundle.js)
app.use('/', express.static(path.join(__dirname, '../dist')));

//  response to get on main page with the index html
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

//  response to get request on portfolio 
app.use('/portfolio', portfolioRouter);
app.use('/userpage', userpageRouter);

//  listen to PORT
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});


//  Handle all unknown request
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//  Global error handler
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

module.exports = app;
