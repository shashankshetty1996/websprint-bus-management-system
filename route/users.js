const express = require('express');
const jwt = require('jsonwebtoken');
let router = express.Router();

const user = require('../model/users');

router.get('/', (req, res) => {
    user.getUsers((err, result) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json(result);
        }
    });
});

router.post('/auth', verifyToken, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user.getAuth(username, password, (err, result) => {
        if(err) {
            res.sendStatus(403);
        } else {
            if(result != '') {
                let user = result[0];                
                jwt.sign({user:user.username}, 'nitte', { expiresIn : '9h'}, (err, token) => {
                    if(err) {
                        res.sendStatus(403);
                    } else {
                        result[0].token = token;
                        result = result[0];
                        console.log(result);
                        res.json(result);            
                    }
                });
            } else {
                res.json({username: '', password: '' });
            }
        }
    });
});

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];    

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {      
        res.sendStatus(403);
    }
}

module.exports = router;