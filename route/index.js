const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('hello from api');
});

module.exports = router;