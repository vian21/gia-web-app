const jwt = require('jsonwebtoken');

const getAuthenticatedUserId = async (req) => {

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
        try {
            let decoded = jwt.verify(token, process.env.JWT_KEY);

            return decoded.id

        } catch (error) {
            return 0;
        }

    } else {
        return 0;
    }

}

module.exports = getAuthenticatedUserId;