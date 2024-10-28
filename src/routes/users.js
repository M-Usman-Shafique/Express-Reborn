import { Router } from "express";
import { findIndexByUserId } from "../middlewares/users.js";
import {
  addUser,
  createUser,
  deleteUser,
  getSearchedUsers,
  getUser,
  updateUser,
  updateUserProperty,
} from "../controllers/users.js";

const router = Router();

router.post("/", createUser);

router.get("/:id", getUser);

router.get("/", getSearchedUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.patch("/:id", findIndexByUserId, updateUserProperty);

router.delete("/:id", deleteUser);

export default router;
