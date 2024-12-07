import { Router } from "express";
import { createListing } from "../controllers/listing.controller";

const router = Router();

router.get('/',);
router.post('/create', createListing)

export default router;