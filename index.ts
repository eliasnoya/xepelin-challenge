import express, { Express } from "express";
import bodyParser from "body-parser";
import ExceptionHandler from "./src/shared/ExceptionHandler";
import morgan from "morgan";

import {
  AccountsRouter,
  TransactionRouter,
} from "./src/infrastructure/Routers";

const app: Express = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/accounts", AccountsRouter);
app.use("/transaction", TransactionRouter);

app.use(ExceptionHandler);

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`);
});
