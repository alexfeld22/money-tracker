import { ITransaction } from "./../../types/transaction";
import Joi from "joi";
import express from "express";
import moment from "moment";
import codes from "http-status-codes";
import { transactionService } from "../../db/services/transaction-service";
import { CURRENCIES } from "../../consts";

const router = express.Router();
router.use(express.json());

function validateTransaction(transaction: ITransaction) {
  const schema = Joi.object({
    transactionId: Joi.string().guid().optional(),
    categoryId: Joi.string().guid().required(),
    currencyCode: Joi.string()
      .valid(...Object.values(CURRENCIES))
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

router.get("/:id", async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id
    );
    if (!transaction)
      return res
        .status(codes.NOT_FOUND)
        .send("Transaction with given ID is not found");
    res.status(codes.OK).send(transaction);
  } catch (error) {
    console.error("Service Error: ", error);
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions();
    res.status(codes.OK).send(transactions);
  } catch (error) {
    console.error("Service Error: ", error);
  }
});


router.get("/:userId/:startDat/:endDay", async (req, res) => {
  try {
    const result = await transactionService.getSummaryForPeriod(req.params.startDat, req.params.endDay, req.params.userId);
    res.status(codes.OK).send(result);
  } catch (error) {
    console.error("Service Error: ", error);
  }
});


router.post("/", async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(req.body.id);

    if (transaction)
      return res.status(codes.CONFLICT).send("Transaction already exists");

    const { error } = validateTransaction(req.body);
    if (error)
      return res.status(codes.BAD_REQUEST).send(error.details[0].message);

    const result = validateTransaction(req.body);
    const newTransaction = await transactionService.createTransaction(req.body);
    console.log(newTransaction);
    res.status(codes.OK).send(newTransaction);
  } catch (error) {
    console.error("Service Error: ", error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const transaction =  await transactionService.getTransactionById(req.body.id);
    if (!transaction)
      return res.status(codes.NOT_FOUND).send("Transaction with given ID is not found");

    if (req.params.id !== req.body.id && req.body.id)
      res.status(codes.BAD_REQUEST).send("Id in request header doesnt match id in request body");

    const { error } = validateTransaction(req.body);
    if (error)
      return res.status(codes.BAD_REQUEST).send(error.details[0].message);

    const result = validateTransaction(req.body);
    const transactionUpdated = await transactionService.updateTransactionById(req.params.id, result.value);

    res.status(codes.OK).send(transactionUpdated);
  } catch (error) {
    console.error("Service Error: ", error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const transaction =  await transactionService.getTransactionById(req.body.id);
    if (!transaction)
      return res.status(codes.NOT_FOUND).send("Transaction with given ID is not found");
  
    const deletedTransaction = await transactionService.deleteTransactionById(req.body.id)
    res.status(codes.OK).send(deletedTransaction);    
  } catch (error) {
    console.error("Service Error: ", error);
  }
});

export default router;
