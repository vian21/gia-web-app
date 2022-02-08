const jwt = require('jsonwebtoken');
const errorMessage = { error: "Please login!" };

const authenticated = (req, res, next) => {
    //get cookie in request or JWT token in the headers under the param authorization
    if (req.cookies.token || req.headers['authorization']) {
        //variable to store JWT token sent by device either in cookies or athentication header
        let token;

        //cookie based authentication [Web]
        if (req.cookies.token) {
            token = req.cookies.token;

        }

        //authentication token [App]
        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
        }

        //verify token
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {

                res.json(errorMessage);

            } else {

                /*
                 * store user id for next handler
                 * This will be used for queries in Api
                */
                res.locals.id = decoded.id

                next();
            }
        })
    } else {
        res.json(errorMessage);
    }

}

module.exports = authenticated;