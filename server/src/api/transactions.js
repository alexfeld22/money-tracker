const Joi = require('joi');
const express = require('express');
const moment = require('moment');
const codes = require('http-status-codes');

const app = express();
app.use(express.json());

consts = {
    userId: '90092e73-13a3-445c-8213-3d6576b2cb2e',
    walletId: '40e4769c-2738-412e-b2dd-6b75f159be33',
    categoryId: '2332b030-c68b-4d45-bcb0-208d3622ba9b',
    currencies: {
        USD: 'USD',
        CAD: 'CAD',
        ILS: 'ILS',
        EURO: 'EUR'
    }
}

const transactions = [
    {
        id: 'e0ddea62-d30e-47ac-9185-902b55ac933c',
        categoryId: consts.categoryId,
        currencyCode: consts.currencies.USD,
        payee: 'Cosco',
        comment: 'Milk, chockolate bars, beef...',
        userId: consts.userId,
        amount: 34.17,
        walletId: consts.walletId,
        date: '2024-05-28T13:51:13-07:00'
        // paymentDistributionCurrent?: PaymentDistribution[] 
        // paymentDistributionDesired?: PaymentDistribution[] 
    },
    {
        id: 'e0ddea62-d30e-47ac-918d-902b55ac933c',
        categoryId: consts.categoryId,
        currencyCode: consts.currencies.CAD,
        payee: 'Metro',
        comment: 'Chips',
        userId: consts.userId,
        amount: 4.00,
        walletId: consts.walletId,
        date: '2024-06-03T13:50:13-07:00'
    }
]


function validateTransaction(transaction){
    const schema = Joi.object({
        id: Joi.string().guid().optional(),
        categoryId: Joi.string().guid().required(),
        currencyCode: Joi.string().valid(...Object.keys(consts.currencies)).required(),
        payee: Joi.string().allow("").required(),
        comment: Joi.string().allow("").required(),
        userId: Joi.string().guid().required(),
        amount: Joi.number().required(),
        walletId: Joi.string().guid().required(),
        date: Joi.string().isoDate().required()
    })

    return schema.validate(transaction);
}

app.get('/', (req, res) => {
    res.status(codes.StatusCodes.OK).send('OK');
})

app.get('/api/transactions/:id', (req, res) => {
    const transaction = transactions.find(t => t.id === req.params.id);
    if (!transaction) return res.status(codes.StatusCodes.NOT_FOUND).send('Transaction with given ID is not found');
    res.status(codes.StatusCodes.OK).send(transaction);
});

app.get('/api/transactions', (req, res) => {
    // const transaction = transactions.find(t => t.id === req.params.id);
    // if (!transaction) return res.status(codes.StatusCodes.NOT_FOUND).send('Transaction with given ID is not found');
    res.status(codes.StatusCodes.OK).send(transactions);
});

app.post('/api/transactions', (req, res) => {

    const transaction = transactions.find(t => t.id === req.body.id);
    if (transaction) return res.status(codes.StatusCodes.CONFLICT).send('Transaction already exists');

    const result = validateTransaction(req.body);
    const { error } = validateTransaction(req.body);
    if (error) return res.status(codes.StatusCodes.BAD_REQUEST).send(error.details[0].message);
    
    const newTransaction = {...req.body, id: crypto.randomUUID()};

    transactions.push(newTransaction);

    res.status(codes.StatusCodes.OK).send(newTransaction);

});

app.put('/api/transactions/:id', (req, res) => {
    const transaction = transactions.find(t => t.id === req.params.id);
    if (!transaction) return res.status(codes.StatusCodes.NOT_FOUND).send('Transaction with given ID is not found');
    if (req.params.id !== req.body.id && req.body.id) res.status(codes.StatusCodes.BAD_REQUEST).send('Id in request header doesnt match id in request body');

    const result = validateTransaction(req.body);
    const { error } = validateTransaction(req.body);
    if (error) return res.status(codes.StatusCodes.BAD_REQUEST).send(error.details[0].message);

    const index = transactions.findIndex(t => t.id === req.params.id);
    transactions[index] = transaction;

    res.status(codes.StatusCodes.OK).send(transactions[index]);
});

app.delete('/api/transactions/:id', (req, res) => {
    const index = transactions.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(codes.StatusCodes.NOT_FOUND).send('Transaction with given ID is not found');

    res.status(codes.StatusCodes.OK).send(transactions.splice(index,1)[0]);
});


// app.get('/transactions', (req, res) => {
//     const dateFrom = req.query.dateFrom;
//     const dateTo = req.query.dateTo;
//     res.send(`dateFrom = ${moment(dateFrom).format()} and dateTo = ${moment(dateTo).format()}`);
// })



const port = process.env.PORT||3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));