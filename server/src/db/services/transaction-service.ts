import { TransactionModel } from "./../models/transaction-model";
import { ITransaction, ITransactionGroup } from "./../../types/transaction";
import moment from "moment";
import {T_TYPES} from "../../consts";

export const transactionService = {
  getTransactions: async () => {
    try {
      const transactions: ITransaction[] = await TransactionModel.find();

      return groupTransactionsBy(transactions, "day");
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
  getSummaryForPeriod: async (
    period: string,
    startDay: string,
    endDay: string,
    userId: string
  ) => {
    try {
      const startDate = new Date(startDay);
      const endDate = new Date(endDay);
      const result = await TransactionModel.find({
        userId: userId,
        date: { $gte: startDate, $lte: endDate },
      });

      // const plainResult = result.map((doc: Document) => doc.toObject() as ITransaction);

      const incomes = result.filter((t) => t.type === T_TYPES.income.display);
      const outcomes = result.filter((t) => t.type === T_TYPES.outcome.display);
      console.log(result);
      const incomeData = calculateSumByMonth(incomes);
      const outcomeData = calculateSumByMonth(outcomes);
      const labels = incomeData.map(m => m.month);

      return {
        userId: userId,
        periodTitle: `${moment(startDate).format('MMM')}. ${moment(startDate).format('YYYY')}`,
        incomes: incomeData,
        outcomes: outcomeData,
        labels: labels
      }
    } catch (err) {
      console.log("DB Error: ", err);
      return null;
    }
  },
};

function calculateSumByMonth(transactions: ITransaction[]) {

  const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((m) => {
    return {
      month: moment().month(m).format("MMMM"),
      totalAmount: 0,
    };
  });

  transactions.forEach((transaction) => {
    const transactionMonth = moment(transaction.day).month();
    result[transactionMonth].totalAmount += transaction.amount;
  });

  return result;
}

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
