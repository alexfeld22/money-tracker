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
import { setTheme, setTransactionsData, setTransactionsPerPeriodByCategory, setTransactionsSummaryPerPeriod } from "./store/slices";
import { TransactionsGrouped, TransactionsSummaryPerPeriod, TransactionsSummaryPerPeriodByCategory } from "./types/transaction-type";
import { useEffect } from "react";

const fetchTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3002/api/transactions");
    const data: TransactionsGrouped[] = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch data error: ", err);
  }
};

const fetchTransactionsSummaryPerPeriod = async (
  startDay: string,
  endDay: string
): Promise<TransactionsSummaryPerPeriod | null> => {
  try {
    //TODO:
    // change userId to id from authorised user.
    const userId = "90092e73-13a3-445c-8213-3d6576b2cb2e";

    const response = await fetch(
      `http://localhost:3002/api/transactions/${userId}/${startDay}/${endDay}`
    );
    const data: TransactionsSummaryPerPeriod = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch data error: ", err);
    return null;
  }
};

const fetchTransactionsPerPeriodByCategory = async (
  startDay: string,
  endDay: string
): Promise<TransactionsSummaryPerPeriodByCategory | null> => {
  try {
    //TODO:
    // change userId to id from authorised user.
    const userId = "90092e73-13a3-445c-8213-3d6576b2cb2e";

    const response = await fetch(
      `http://localhost:3002/api/transactions/byCategory/${userId}/${startDay}/${endDay}`
    );
    const data: TransactionsSummaryPerPeriodByCategory = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch data error: ", err);
    return null;
  }
};

function App() {
  // dispatch(setTheme());
  const isDark = useAppSelector((store) => store.transactions.isDark);
  // console.log('isDark? ' ,isDark)

  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log("useEffect triggered");

    fetchTransactions()
      .then((transactionsData) => {
        if (!transactionsData) {
          console.log("NO DATA");
          return;
        }
        // console.log("Data fetched:", transactionsData);
        dispatch(setTransactionsData(transactionsData));
        // console.log("Data dispatched to store");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });

    // change to StartDay and EndDay from user.
    const startDay = "2024-05-01";
    const endDay = "2024-05-31";

    fetchTransactionsSummaryPerPeriod(startDay, endDay)
      .then((data) => {
        if (!data) {
          console.log("NO DATA");
          return;
        }
        // console.log("Data fetched:", transactionsData);
        dispatch(setTransactionsSummaryPerPeriod(data));
        // console.log("Data dispatched to store");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });


      fetchTransactionsPerPeriodByCategory(startDay, endDay)
      .then((data) => {
        if (!data) {
          console.log("NO DATA");
          return;
        }
        // console.log("Data fetched:", data);
        dispatch(setTransactionsPerPeriodByCategory(data));
        // console.log("Data dispatched to store");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const isDark = useAppSelector (store => store.transactions.isDark);

  function toggleMode() {
    dispatch(setTheme());
  }

  const transactionsSummary = useAppSelector((store) => store.transactions.summaryPerPeriodbyCategory);

  const dataIncomesByCategory = transactionsSummary.incomes.map((item) => {
    return { value: item.amountTotal, label: item.groupBy };
  });

  
  const dataOutcomesByCategory = transactionsSummary.outcomes.map((item) => {
    return { value: item.amountTotal, label: item.groupBy };
    });
    
    console.log('DATA FOR PIE ', dataOutcomesByCategory);

    
  const pieChartSize = {
    width: 400,
    height: 250,
  };

  return (
    <Box sx={{ display: "flex", background: "paper" }}>
      <PermanentDrawerLeft />
      <Box>
        <TrahsactionList />
      </Box>
      <Box>
        <SimpleBarChart />
        <PieChartWithCenterLabel title="Incomes" data={dataIncomesByCategory} size={pieChartSize}/>
        <PieChartWithCenterLabel title="Outcomes" data={dataOutcomesByCategory} size={pieChartSize}/>
      </Box>
    </Box>
  );
}

export default App;
