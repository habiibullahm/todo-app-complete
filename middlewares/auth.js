const jwt = require("jsonwebtoken"),
{ JWT_SECRET_KEY } = process.env;


exports.isAuthenticated = (req, res, next) => {
    let { access_token } = req.headers;
    if (access_token) {
        jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ message : "failed to authenticate token"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({ message :"no token provided!"})
    }
};

exports.isOwner
/// search user by id from token (decoded.id)
// search todo from id params
// check if userId in todo equal to user id from token
// if yes, next
// if no, block
