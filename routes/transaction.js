import express from "express";
import { addFunds, createAcc, withdrawFunds } from "../controllers/account.js";

const router = express.Router();

router.route("/").post(createAcc);
router.route("/:id").post(addFunds);
router.route("/").get(withdrawFunds);

export default router;
