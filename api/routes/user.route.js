import { Router } from "express";
import {  deleteUserInfo, updateUserInfo, getUserListings, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();


router.post('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUserInfo);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;