const sessionController = {};
const Session = require('../models/sessionModel');

//  Create new session when user login/signup
sessionController.startSession = (req, res, next) => {
    const session = { 'cookieId': res.locals.id }
    Session.findOneAndUpdate(session, {}, { upsert: true, new: true })
        .then((response) => {
            // console.log(response);
            next();
        })
        // if an error occur, pass to global error handler
        .catch(error => {
            next('Bad');
        });
}

//  Create new session when user login/signup
sessionController.lookUpSession = (req, res, next) => {
    const session = { 'cookieId': req.cookies.userID }
    // console.log(session);
    Session.findOne(session)
        .then((response) => {
            // console.log(response);
            if (response.cookieId){
                res.locals.login = true;
                next();
            }
        })
        // if an error occur, pass to global error handler
        .catch(error => {
            next('Bad');
        });
}



module.exports = sessionController;
