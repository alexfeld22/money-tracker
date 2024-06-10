import Joi from "joi";
import express from "express";
import moment from "moment";
import codes from "http-status-codes";

const router = express.Router();
router.use(express.json());

const MOCKDATA = {
  userId: "90092e73-13a3-445c-8213-3d6576b2cb2e",
  walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
  categoryId: "2332b030-c68b-4d45-bcb0-208d3622ba9b",
  currencies: {
    USD: "USD",
    CAD: "CAD",
    ILS: "ILS",
    EURO: "EUR",
  },
};

const transactions = [
  {
    id: "e0ddea62-d30e-47ac-9185-902b55ac933c",
    categoryId: MOCKDATA.categoryId,
    currencyCode: MOCKDATA.currencies.USD,
    payee: "Cosco",
    comment: "Milk, chockolate bars, beef...",
    userId: MOCKDATA.userId,
    amount: 34.17,
    walletId: MOCKDATA.walletId,
    date: "2024-05-28T13:51:13-07:00",
    // paymentDistributionCurrent?: PaymentDistribution[]
    // paymentDistributionDesired?: PaymentDistribution[]
  },
  {
    id: "e0ddea62-d30e-47ac-918d-902b55ac933c",
    categoryId: MOCKDATA.categoryId,
    currencyCode: MOCKDATA.currencies.CAD,
    payee: "Metro",
    comment: "Chips",
    userId: MOCKDATA.userId,
    amount: 4.0,
    walletId: MOCKDATA.walletId,
    date: "2024-06-03T13:50:13-07:00",
  },
];

function validateTransaction(transaction: (typeof transactions)[0]) {
  const schema = Joi.object({
    id: Joi.string().guid().optional(),
    categoryId: Joi.string().guid().required(),
    currencyCode: Joi.string()
      .valid(...Object.keys(MOCKDATA.currencies))
      .required(),
    payee: Joi.string().allow("").required(),
    comment: Joi.string().allow("").required(),
    userId: Joi.string().guid().required(),
    amount: Joi.number().required(),
    walletId: Joi.string().guid().required(),
    date: Joi.string().isoDate().required(),
  });

  return schema.validate(transaction);
}

router.get("/:id", (req, res) => {
  const transaction = transactions.find((t) => t.id === req.params.id);
  if (!transaction)
    return res
      .status(codes.NOT_FOUND)
      .send("Transaction with given ID is not found");
  res.status(codes.OK).send(transaction);
});

router.get("/", (req, res) => {
  // const transaction = transactions.find(t => t.id === req.params.id);
  // if (!transaction) return res.status(codes.NOT_FOUND).send('Transaction with given ID is not found');
  res.status(codes.OK).send(transactions);
});

router.post("/", (req, res) => {
  const transaction = transactions.find((t) => t.id === req.body.id);
  if (transaction)
    return res
      .status(codes.CONFLICT)
      .send("Transaction already exists");

  const result = validateTransaction(req.body);
  const { error } = validateTransaction(req.body);
  if (error)
    return res
      .status(codes.BAD_REQUEST)
      .send(error.details[0].message);

  const newTransaction = { ...req.body, id: crypto.randomUUID() };

  transactions.push(newTransaction);

  res.status(codes.OK).send(newTransaction);
});

router.put("/:id", (req, res) => {
  const transaction = transactions.find((t) => t.id === req.params.id);
  if (!transaction)
    return res
      .status(codes.NOT_FOUND)
      .send("Transaction with given ID is not found");
  if (req.params.id !== req.body.id && req.body.id)
    res
      .status(codes.BAD_REQUEST)
      .send("Id in request header doesnt match id in request body");

  const { error } = validateTransaction(req.body);
  if (error)
    return res
      .status(codes.BAD_REQUEST)
      .send(error.details[0].message);

  const result = validateTransaction(req.body);
  const index = transactions.findIndex((t) => t.id === req.params.id);
  transactions[index] = result.value;

  res.status(codes.OK).send(transactions[index]);
});

router.delete("/:id", (req, res) => {
  const index = transactions.findIndex((t) => t.id === req.params.id);
  if (index === -1)
    return res
      .status(codes.NOT_FOUND)
      .send("Transaction with given ID is not found");

  res.status(codes.OK).send(transactions.splice(index, 1)[0]);
});

// app.get('/transactions', (req, res) => {
//     const dateFrom = req.query.dateFrom;
//     const dateTo = req.query.dateTo;
//     res.send(`dateFrom = ${moment(dateFrom).format()} and dateTo = ${moment(dateTo).format()}`);
// })

export default router;
