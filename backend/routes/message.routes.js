//this will consist of routes that are related to messages

import express from "express";
import { sendMessage } from "../controller/message.controller.js";
import { signup ,login,logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/send/:id",sendMessage);      //signup(at end) is the controller for this route

router.post("/login",login);

router.post("/logout",logout);

export default router;