import express, { Router } from "express";
import {  updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();


router.post('/update/:id', verifyToken, updateUserInfo);

export default router;