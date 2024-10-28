import { Router } from "express";
import { getProduct } from "../controllers/products.js";

const router = Router();

router.get("/", getProduct);

export default router;
