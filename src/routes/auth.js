import { Router } from "express";
import passport from "passport";
import "../strategies/local.js";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  console.log(req.user);

  console.log(req.session);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
