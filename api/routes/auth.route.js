import express, { Router } from "express";
import { signIn, signUp, google, signOut } from "../controllers/auth.controller.js";

const router = Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/sign-out', signOut)
router.post('/google', google)

export default router;