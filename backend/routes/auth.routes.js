//this will consist of routes that are related to auth

import express from "express";
import { signup ,login,logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);      //signup(at end) is the controller for this route

router.post("/login",login);

router.post("/logout",logout);

export default router;