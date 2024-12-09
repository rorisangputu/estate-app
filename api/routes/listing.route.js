import { Router } from "express";
import { createListing, deleteListing, listings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get('/', listings);
router.post('/create', verifyToken, createListing);
router.post('/delete/:id', verifyToken, deleteListing);

export default router;