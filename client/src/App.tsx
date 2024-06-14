import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Box } from "@mui/material";
import PermanentDrawerLeft from "./components/Drawer";
import TrahsactionList from "./components/TransactionList";
import SimpleBarChart from "./components/BarChart";
import PieChartWithCenterLabel from "./components/PieChart";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setTheme, setTransactionsData } from "./store/slices";
import { TransactionsDataType } from "./types/transaction-type";
import { useEffect } from "react";

const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/transactions");
    const data: TransactionsDataType[] = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch data error: ", err);
  }
};

function App() {
  // dispatch(setTheme());
  const isDark = useAppSelector (store => store.transactions.isDark);
  // console.log('isDark? ' ,isDark)

  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("useEffect triggered");
  
    fetchTransactions().then((transactionsData) => {
      if (!transactionsData) {
        console.log("NO DATA");
        return;
      }
      // console.log("Data fetched:", transactionsData);
      dispatch(setTransactionsData(transactionsData));
      // console.log("Data dispatched to store");
    }).catch((error) => {
      console.log("Error fetching data:", error);
    });
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const isDark = useAppSelector (store => store.transactions.isDark);

  function toggleMode (){
    dispatch(setTheme());
  }
  
  return (
    <Box sx={{ display: "flex", background: "paper" }}>
      <PermanentDrawerLeft />
      <TrahsactionList />
      <SimpleBarChart />
      <PieChartWithCenterLabel />
      <button className=""  > Toggle ME!</button>
    </Box>
  );
}

export default App;
