import express, { Router } from "express";
import { test, updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();

router.get('/', test);
router.put('/update', verifyToken, updateUserInfo);

export default router;