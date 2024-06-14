import List from "@mui/material/List";
import { useAppSelector } from "../store/hooks";
import TransactionItem from "./TransactionItem";
import { isDate } from "moment";

function TransactionList() {
  const TRANSACTIONS2 = useAppSelector((store) => store.transactions);
  // const transactionsPerDate = TRANSACTIONS2.transactions.map((item) =>
  //   moment(item.date).format("YYYY-MM-DD")
  // );

  // TODO: why when app is loaded first time - transactions.data is empty??? 
  if (TRANSACTIONS2.data.length === 0) return <></>

  // // function getTransactionsGroubBy(datePart){
  // //   if (datePart === 'day') {const format = 'YYYY'}

  // const result = TRANSACTIONS2.transactions.reduce((acc, currentValue) => {
  //   const groupKey = currentValue['date'];
  //   if (!acc[groupKey]) {
  //     acc[groupKey] = [];
  //   }
  //   acc[groupKey].push(currentValue);
  //   return acc;
  // }, {});

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {TRANSACTIONS2.data[0].transactions.map((item) => (
        <TransactionItem
          transaction={item}
          key={item.transactionId}
          //TODO: make it more presentable
          // sx={{background: item.amount > 0 ?"lightgreen" : "default"}}
        />
      ))}
    </List>
  );
}

export default TransactionList;

// const TRANSACTIONS = [
//   {
//     transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3b",
//     categoryId: "Education",
//     currencyCode: "CAD",
//     payee: "Microsoft",
//     comment: "Chat GPT",
//     userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
//     amount: 3999.17,
//     walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
//     date: "2024-05-28T20:51:13.000Z",
//     type: "outcome",
//   },
//   {
//     transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3a",
//     categoryId: "Education",
//     currencyCode: "EUR",
//     payee: "Microsoft",
//     comment: "Chat GPT",
//     userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
//     amount: 3999.17,
//     walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
//     date: "2024-05-28T20:51:13.000Z",
//     type: "outcome",
//   },
//   {
//     transactionId: "2dc2ba1c-e371-4036-90fe-fe3500c94a3c",
//     categoryId: "Education",
//     currencyCode: "ILS",
//     payee: "Keshet",
//     comment: "Milk, butter, etc",
//     userID: "90092e73-13a3-445c-8213-3d6576b2cb2e",
//     amount: -3999.17,
//     walletId: "40e4769c-2738-412e-b2dd-6b75f159be33",
//     date: "2024-05-28T20:51:13.000Z",
//     type: "income",
//   },
// ];
