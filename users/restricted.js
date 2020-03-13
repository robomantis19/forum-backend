const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js');


module.exports = (req, res, next) => { 
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (error, decodedToken) => { 
            if(error) {
                res.status(401).json({SaltiestError: 'Need to verify token cannot pass'})
            }else{
                console.log('decodedToken', decodedToken)
                req.user = decodedToken.user;
                next();
            };
        });
    }else{
        res.status(401).json({SaltiestError: 'No token Provided'})
    }
}

