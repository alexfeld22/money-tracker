import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
// import Register from './pages/Register';
import Transaction from "./pages/Transaction";

function App() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <NavBar />
      <Transaction />
    </Box>
  );
}

export default App
