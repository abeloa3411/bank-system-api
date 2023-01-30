import express from "express";
import transaction from "./routes/transaction.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/account", transaction);

export default app;
