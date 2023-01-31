import express from "express";
import {
  addFunds,
  allAccounts,
  createAcc,
  transferFunds,
  withdrawFunds,
} from "../controllers/account.js";

const router = express.Router();

router.route("/").post(createAcc);
router.route("/deposit/:id").post(addFunds);
router.route("/withdraw/:id").post(withdrawFunds);
router.route("/transfer/:id").post(transferFunds);
router.route("/").get(allAccounts);

export default router;
