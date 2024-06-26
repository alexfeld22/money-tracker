import List from "@mui/material/List";
import { useAppSelector } from "../store/hooks";
import TransactionSubheader from "./TransactionListSubheader";

function TransactionList() {
  const TRANSACTIONS2 = useAppSelector((store) => store.transactions);

  // TODO: why when app is loaded first time - transactions.data is empty??? 
  if (TRANSACTIONS2.data.length === 0) return <></>
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        height: '100%',
        // maxHeight: 300,
        '& ul': { padding: 1 },
      }}
      subheader={<li />}
    >
      {TRANSACTIONS2.data.map(item => <TransactionSubheader key={item.groupBy} data={item}/>)}
    </List>
  );
}

export default TransactionList;