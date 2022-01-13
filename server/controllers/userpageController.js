const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const User = require('../models/userModel');

const userpageController = {};


userpageController.signup = (req, res, next) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then((response) => {
      //console.log(response.id);

      //store the id of the newly created documents in locals with key id
      // console.log(response.password);
      res.locals.id = response.id;
      next();
    })
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Bad');
    });
};

userpageController.login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({'username': username, 'password': password})
    /*create an async function because we need to use await so we don't execute the lines after 
    validatePassword until the promise gets resolved (a boolean is returned)*/
    .then((result) => {
      res.locals.id = result.id;
      next();
    }) 
    // if an error occur, pass to global error handler
    .catch(error => {
      next('Invalid username and password combination. Please try again or sign up for a new account');
    });
};



// EXPORT THE CONTROLLER 
module.exports = userpageController;