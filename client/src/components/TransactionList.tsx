import List from "@mui/material/List";
import { useAppSelector } from "../store/hooks";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const TRANSACTIONS2 = useAppSelector((store) => store.transactions);

  // TODO: why when app is loaded first time - transactions.data is empty??? 
  if (TRANSACTIONS2.data.length === 0) return <></>

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