import express from "express";
import {
  addFunds,
  allAccounts,
  createAcc,
  transferFunds,
  withdrawFunds,
} from "../controllers/account.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(auth, createAcc);
router.route("/deposit/:id").post(auth, addFunds);
router.route("/withdraw/:id").post(auth, withdrawFunds);
router.route("/transfer/:id").post(auth, transferFunds);
router.route("/").get(allAccounts);

export default router;
