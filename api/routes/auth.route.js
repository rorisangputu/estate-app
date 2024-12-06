import express, { Router } from "express";
import { signIn, signUp, google } from "../controllers/auth.controller.js";

const router = Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/google', google)

export default router;