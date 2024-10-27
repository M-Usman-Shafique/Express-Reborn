import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  // console.log(req.user);

  console.log(req.session);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.get("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    return res.send(200);
  });
});

export default router;
