import express from "express";
import {
  addFunds,
  allAccounts,
  createAcc,
  getBalance,
  transferFunds,
  withdrawFunds,
} from "./transactionControllers.js";
import auth from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(auth, createAcc);
router.route("/deposit/:id").post(auth, addFunds);
router.route("/withdraw/:id").post(auth, withdrawFunds);
router.route("/transfer/:id").post(auth, transferFunds);
router.route("/balance/:id").get(getBalance);
router.route("/").get(allAccounts);

export default router;
