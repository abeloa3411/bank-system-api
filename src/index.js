import express from "express";
import transaction from "./api/transactions/transactionRoute.js";
import auth from "./api/auth/authRoute.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/account", transaction);
app.use("/api/auth", auth);

export default app;
