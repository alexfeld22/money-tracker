import mongoose from 'mongoose'
// const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    parentCategoryUUID: { type: String, required: false }
});

export const CategoryModel = mongoose.model('Category', categorySchema);


const paymentDistributionSchema = new mongoose.Schema({
    transactionUUID: { type: String, required: true },
    userUUID: { type: String, required: true },
    amount: { type: Number, required: true }
});

const transactionSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    currencyCode: { type: String, required: true },
    payee: { type: String, required: true },
    comment: { type: String, required: true },
    userUUID: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDistributionCurrent: [paymentDistributionSchema],
    paymentDistributionDesired: [paymentDistributionSchema],
    walletUUID: { type: String, required: true },
    eventUUID: { type: String },
    date: { type: String, required: true }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);


// const walletSchema = new mongoose.Schema({
//     uuid: { type: String, required: true, unique: true },
//     baseCurrencyCode: { type: String, required: true },
//     name: { type: String, required: true },
//     description: { type: String },
//     owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// });

// export const Wallet = mongoose.model('Wallet', walletSchema);