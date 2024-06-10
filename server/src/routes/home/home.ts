import express from 'express'
const router = express.Router();
const codes = require('http-status-codes');

router.get('/', (req, res) => {
    res.status(codes.OK).send('OK');
});

export default router;