import { Router } from "express";
import passport from "passport";
import { isAuth, login, logout } from "../controllers/auth.js";

const router = Router();

router.post("/", passport.authenticate("local"), login);

router.get("/status", isAuth);

router.get("/logout", logout);

export default router;
