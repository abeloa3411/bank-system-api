import express from "express";
import transaction from "./routes/transaction.js";
import auth from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/account", transaction);
app.use("/api/auth", auth);

export default app;
