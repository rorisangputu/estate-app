import { Router } from "express";
import { createListing, deleteListing, editListing, getListing, getListings, listings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.get('/', listings);
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, editListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;