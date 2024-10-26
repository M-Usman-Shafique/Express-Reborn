// Wrapper for all routes
import { Router } from "express";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import authRouter from "./auth.js";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);

export default router;
