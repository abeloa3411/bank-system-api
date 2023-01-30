import express from "express";
import { addFunds } from "../controllers/account.js";
import { userLogin, userSignup } from "../controllers/user.js";

const router = express.Router();

router.route("/").post(addFunds);
router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);

export default router;
