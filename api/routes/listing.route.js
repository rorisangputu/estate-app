import { Router } from "express";
import { createListing, listings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get('/', listings);
router.post('/create', verifyToken, createListing)

export default router;