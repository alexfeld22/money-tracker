import { TransactionModel } from "./../models/transaction-model";
import { ITransaction, ITransactionGroup } from "./../../types/transaction";
import moment from "moment";
import { func } from "joi";

export const transactionService = {
  getTransactions: async () => {
    try {
      const transactions: ITransaction[] = await TransactionModel.find();

      return groupTransactionsBy(transactions, "day");
      // {
      //   data: transactions,
      //   info: {
      //     count: transactions.length,
      //   }
      // }
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
  getTransactionById: async (id: string) => {
    try {
      return await TransactionModel.findOne({ transactionId: id });
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
      const transactionDay = moment(transactionData.date).format("YYYY-MM-DD");
      const transaction = new TransactionModel({
        ...transactionData,
        transactionId: transactionId,
        day: transactionDay,
      });
      const result = await transaction.save();
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

function groupTransactionsBy(
  transactions: ITransaction[],
  period: keyof ITransaction
) {
  const groupedTransactions = transactions.reduce(
    (acc: { [key: string]: ITransactionGroup }, currentVal: ITransaction) => {
      const key = String(currentVal[period]);
      if (!acc[key]) {
        acc[key] = {
          period: key,
          amountTotal: 0,
          transactions: [],
        };
      }
      acc[key].transactions.push(currentVal);
      acc[key].amountTotal += currentVal.amount;
      return acc;
    },
    {}
  );

  return Object.values(groupedTransactions);
}
