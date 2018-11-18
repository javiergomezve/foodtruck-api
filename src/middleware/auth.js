import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKEN_TIME = 60 * 60 * 24 * 30; // 30 days
const SECRET = '3oN2TK9DfXg42Y5wjyUO/rbvUNHnYb08gsGDQK34aw';

export const authenticate = expressJwt({secret : SECRET});

export const generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
      id: req.user.id,
    }, SECRET, {
      expiresIn: TOKEN_TIME
    });

    next();
};

export const respond = (req, res) => {
    res.status(200).json({
      user: req.user.username,
      token: req.token
    });
};
