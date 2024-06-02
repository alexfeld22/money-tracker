# Money Tracker Website

## Description

This is the website for tracking personal finances in different currencies: incomes, outcomes, events cost.

## Key Features

- For each transaction, users can add a payee AND a comment. The payee is like a dictionary entry indicating where you spent money, and the comment is a string to remember what you paid for.
- Events: In every transaction, users can mention an event (for example, journey, birthday, wedding, etc.), so they can track how much they spend on the event in total.
- Multicurrency wallets. Each wallet can have transactions in many currencies; users can choose a base currency for a wallet. As the app contains exchange rates for currencies for each day, it can recalculate transactions in the base currency correctly by using the exchange rate from the day of the transaction, not today's rate.
- Multiuser wallets. The app can maintain not only personal wallets but shared ones. For example, a family wallet, or a shared wallet for tracking how much a group of people spend on an event.
- Categories are cross-wallets, so users can get accurate statistics from all their wallets.

## Entities

### User

- uuid
- name
- email (unique)
- password
- personalCategories
- events

### Transaction

- uuid
- category
- note
- currency
- payee
- comment
- event
- Amount
  - amountTotal
  - paymentDistributionCurrent
    - [{user_uuid, amount}]
  - paymentDistributionFinal
    - [{user_uuid, amount}]

### Wallet

- uuid
- [uuid]
- transactions[]
- baseCurrency
- payees[]

### Currencies

- {name, code, symbol, isSymbolAfterAmount}

### Currencies Exchange Rates

- day
- baseCurrency (USD)
- [{day, currencyCode, exchangeRate }]

### CategoriesPersonal

- category_personal_uuid
- category_uuid
- parent_category_uuid
- name
- picture
- categoryIcon

### Icons

- []icons

### Events

- uuid
- name
- start date
- end date
- isFinished
- baseCurrency
- Transactions[]

## External APIs

- Exchange rate API

## API

### /auth

- login

### /wallets

- getWalletsByUserId
- getWalletById
- create/update/delete wallet
- changeWalletCurrency

### /transactions

- getTransactionByText (search)
- create/update/delete transaction
- getTransactionsByTimeFrame (between dates, currency to display)
- getTransactionsGroupedByCategory (between dates, group by categories, currency to display)

### /categories

- getCategoryList

### /personalCategories

- create/update/delete personalCategory

## MVP

### Web Features

- login
- create/update/delete wallet
- create/read/update/delete transaction
  - date, amount, category, payee, comment, event (optional)
- see transaction list
  - per month
  - per month and wallet
- search transaction by payee/comment
- search transaction by month
