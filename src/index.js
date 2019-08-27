const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/', (req, res) => {
    res.json({
        message: 'Route works'
    })
})

app.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, tokenInfo) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                tokenInfo
            })
        }
    })
    res.json({
        message: 'post successfully created'
    })
})

function verifyToken(req, res, next) {
    const bearer = req.headers['authorization'].split(' ');
    const token = bearer[1]
    if (typeof bearer !== 'undefined') {
        req.token = token;
        next()
    } else {
        res.sendStatus(403)
    }
}


app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Abshir',
        email: 'brotherabshir@gmail.com'
    }
    jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, function (err, token) {
        res.json({ token });
    });
})



app.listen(5000, () => {
    console.log('application is listening to port 5000')
})