const jwt = require('jsonwebtoken');
const errorMessage = { error: "Please login!" };

const authenticated = (req, res, next) => {
    if (req.cookies.token || req.headers['authorization']) {
        let token;

        //cookie based authentication [Web]
        if (req.cookies.token) {
            token = req.cookies.token;

        }
        //auth token [App]
        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
        }

        //verify token
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                res.json(errorMessage);
            } else {
                //store user id for next handler
                res.locals.id = decoded.id
                next();
            }
        })
    } else {
        res.json(errorMessage);
    }

}

module.exports = authenticated;