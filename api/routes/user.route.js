import express, { Router } from "express";
import {  deleteUserInfo, updateUserInfo } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();


router.post('/update/:id', verifyToken, updateUserInfo);
router.post('/delete/:id', verifyToken, deleteUserInfo);

export default router;