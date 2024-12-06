import express, { Router } from "express";
import { test, updateUserInfo } from "../controllers/user.controller.js";
const router = Router();

router.get('/', test);
router.put('/update', updateUserInfo);

export default router;