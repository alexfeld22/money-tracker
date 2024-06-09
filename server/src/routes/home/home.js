const express = require('express');
const router = express.Router();
const codes = require('http-status-codes');

router.get('/', (req, res) => {
    res.status(codes.StatusCodes.OK).send('OK');
});

module.exports = router;