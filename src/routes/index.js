// Wrapper for all routes
import { Router } from "express";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/products", productsRouter);
router.use("/api/auth", authRouter);

export default router;
