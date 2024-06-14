import TransactionItem from "./TransactionItem";
import { TransactionsDataType } from "../types/transaction-type";
import ListSubheader from "@mui/material/ListSubheader";

type TransactionsProps = {
  data: TransactionsDataType
};

function TransactionSubheader(props: TransactionsProps) {
  const section = props.data
  return (
    <li key={section.period}>
      <ul>
        <ListSubheader color={"primary"}>{section.period}</ListSubheader>
        {section.transactions.map((item) => (
          <TransactionItem
            key={item.transactionId}
            transaction={item}
            //   //TODO: make it more presentable
            //   // sx={{background: item.amount > 0 ?"lightgreen" : "default"}}
          />
        ))}
      </ul>
    </li>
  );
}

export default TransactionSubheader;
