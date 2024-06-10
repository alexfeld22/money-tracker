import { ITransaction } from "./../../types/transaction";
import { TransactionModel } from "../models/transaction-model";

export const transactionService = {
  getTransactions: async () => {
    try {
      return await TransactionModel.find();
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
  getTransactionById: async (id: string) => {
    try {
      return await TransactionModel.findOne({transactionId: id});
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
  updateTransactionById: async (id: string, transactionData: ITransaction) => {
    try {
      const transaction = await TransactionModel.findOneAndUpdate(
        {
          id,
          $set: {
            categoryId: transactionData.categoryId,
            currencyCode: transactionData.currencyCode,
            payee: transactionData.payee,
            comment: transactionData.comment,
            userId: transactionData.userId,
            amount: transactionData.amount,
            walletId: transactionData.walletId,
            date: transactionData.date,
          },
        },
        { new: true }
      );
      if (!transaction) {
        console.log("Transaction not found");
        return null;
      }
      return transaction;
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
  createTransaction: async (transactionData: ITransaction) => {
    try {
      const transactionId = crypto.randomUUID();
      const transaction = new TransactionModel({...transactionData, transactionId: transactionId});
      const result = transaction.save();
      return result;
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
  deleteTransactionById: async (id: string) => {
    try {
      const transaction = await TransactionModel.findByIdAndDelete(id);
      if (!transaction) {
        console.log("Transaction not found");
        return null;
      }
      return transaction;
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
};
