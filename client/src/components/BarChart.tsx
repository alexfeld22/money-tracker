import { BarChart } from "@mui/x-charts/BarChart";
import { useAppSelector } from "../store/hooks";

export default function SimpleBarChart() {
  const transactionsSummary = useAppSelector((store) => store.transactions.summaryPerPeriod);

  const incomeData = transactionsSummary.incomes.map(item => item.totalAmount);
  const outcomeData = transactionsSummary.outcomes.map(item => -item.totalAmount);
  const labels = transactionsSummary.labels;

  return (
    <BarChart
      width={800}
      height={300}
      series={[
        { data: incomeData, label: "incomes", id: "iId" },
        { data: outcomeData, label: "oucomes", id: "oId" },
      ]}
      xAxis={[{ data: labels, scaleType: "band" }]}
    />
  );
}
