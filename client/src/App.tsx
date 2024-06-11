import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Box } from "@mui/material";
import PermanentDrawerLeft from "./components/Drawer";
import Record from "./components/Record";
import SimpleBarChart from "./components/BarChart";
import PieChartWithCenterLabel from "./components/PieChart";

function App() {



  return (
    <Box sx={{ display: "flex", background: "paper"}}>
      <PermanentDrawerLeft />
      <Record />
      <SimpleBarChart />
      <PieChartWithCenterLabel />
    </Box>
  );
}

export default App;
