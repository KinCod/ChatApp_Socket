//this will consist of routes that are related to messages

import express from "express";
import { sendMessage,getMessage } from "../controller/message.controller.js";
import { signup ,login,logout } from "../controller/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//ye route jab call hoga tab sendMessage mai jaane se pehle ProtectRoute middleware run hoga jo check krega ki jwt valid hai, user exist krta etc. etc.
//and agar user exist krta the usko req.user mai put krdega and then we go to sendMessage method
router.post("/send/:id", protectRoute ,sendMessage);      //signup(at end) is the controller for this route

router.get("/:id",protectRoute,getMessage);

router.post("/logout",logout);

export default router;