import express from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user.js";

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);
router.route("/").get(getAllUsers);

export default router;
