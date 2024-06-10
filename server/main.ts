import "dotenv/config";
import express from "express";
import helmet from "helmet";
import transactions from "./src/routes/transactions/transactions";
import home from "./src/routes/home/home";
import initMongoose from "./src/db/connection";

const app = express();
app.use(express.json());
app.use(helmet());
app.use("/api/transactions", transactions);
app.use("/", home);

const PORT = process.env.PORT || 3000;

// init server

initMongoose().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}...`)
  );
});
