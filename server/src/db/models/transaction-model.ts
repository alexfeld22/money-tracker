import { UUID } from './../../../node_modules/bson/src/binary';
import { strict } from "assert";
import { number, string } from "joi";
import mongoose from "mongoose";
import { CURRENCIES } from "../../consts";

const transactionSchema = new mongoose.Schema({
  // id: {type: String, unique: true, required: false},
  transactionId: {type: String, required: true, default: UUID},
  categoryId: {type: String, required: true},
  currencyCode: {type: String, required: true, enum: Object.values(CURRENCIES)},
  payee: {type: String, required: false},
  comment: {type: String, required: false},
  userId: {type: String, required: true},
  amount: {type: Number, required: true},
  walletId: {type: String, required: true},
  date: {type: Date, required: true},
  day: {type: String, required: true},
  type: {type: String, required: true}
  // paymentDistributionCurrent?: PaymentDistribution[]
  // paymentDistributionDesired?: PaymentDistribution[]
});

export const TransactionModel = mongoose.model('Transaction', transactionSchema);