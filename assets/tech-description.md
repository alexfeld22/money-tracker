# SERVER

## Types

interface Category {
    uuid: string
    categoryName: string
    parentCategoryUUID: string
}

interface Transaction {
    uuid: string
    category: string // user's category
    currencyCode: string
    payee: string // where you paid
    comment: string // for what you paid
    userUUID: string
    amount: number
    paymentDistributionCurrent?: PaymentDistribution[]
    paymentDistributionDesired?: PaymentDistribution[]
    walletUUID: string
    eventUUID?: string
    date: string // stringified date
}

interface PaymentDistribution {
    transactionUUID: string
    userUUID: string
    amount: number
}

interface Wallet {
    uuid: string
    baseCurrencyCode: string
    name: string
    description?: string
    owner: User
    users: []User
}

interface User {
    username: string
    email: string
    payees: []string
    uuid: string
}

interface UserAccount extends User{
    password: string
}

exchageRates {
    date: string // a strigified date
    baseCurrencyCode: string
    currencyCode; string
    exchangeRate: number
}

events {
    uuid: string
    name: string
    isFinished: boolean
    baseCurrencyCode: string
    users: []User
}

## API

/auth

- login {User} > token
- register {User}

/ transactions

- create/read/update/delete {Transaction | uuid} (User)
- searchTransactions {searchString, startDate, endDate, baseCurrency, category} (User)
- getTransactionsGrouped {startDate, endDate, baseCurrency, aggField} (User)

/ wallets

- create/read/update/delete {Wallet | uuid} (User)
- getWalletById {uuid} (User)
- getWalletsByUserId {uuid} (User)

/ categories

- create/read/update/delete {Category | uuid} (User)
- getCategoriesByUserId {uuid} (User)

middleware

- chackJwt

## Mongo/Mongoose

- Models
- - {User}
- - - ... 
- - {Transaction}
- - - ...
...

# Client

## Http

- Check status http
- /GET  ...
- /POST ... 
- /PUT ...
- /DELETE ...

## Redux Store

# Design

Use MUI

# JSX

