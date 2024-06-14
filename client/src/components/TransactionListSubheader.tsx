import TransactionItem from "./TransactionItem";
import { TransactionsDataType } from "../types/transaction-type";
import ListSubheader from "@mui/material/ListSubheader";
import { Box, Typography } from "@mui/material";

type TransactionsProps = {
  data: TransactionsDataType;
};

function TransactionSubheader(props: TransactionsProps) {
  const section = props.data;
  return (
    <li key={section.period}>
      <ul>
        <ListSubheader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography color="primary">{section.period}</Typography>
            <Typography color="primary">{section.amountTotal}</Typography>
          </Box>
        </ListSubheader>
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
