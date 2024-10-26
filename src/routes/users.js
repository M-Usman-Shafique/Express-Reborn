import { Router } from "express";
import { users } from "../utils/usersData.js";
import { findIndexByUserId } from "../middlewares/users.js";

const router = Router();

router.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).send({ msg: "Bad Request: Inavalid ID" });
  }

  const findUser = users.find((user) => user.id === userId);
  if (!findUser) return res.sendStatus(404);

  return res.send(findUser);
});

router.get("/api/users", (req, res) => {
  const {
    query: { search, value },
  } = req;

  if (search && value) {
    const searchedUsers = users.filter((user) => user[search].includes(value));
    if (searchedUsers.length > 0) {
      return res.send(searchedUsers);
    }
    return res.sendStatus(404);
  }

  return res.send(users);
});

router.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  // Adding new user (recieving in the "body" from the Postman) to the existing users list, mocking a database:

  // Logic: get the last user's id of users list & add "1" to create a new index and then place new user there:
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(users);
});

router.put("/api/users/:id", (req, res) => {
  const { body, params } = req;
  const userId = parseInt(params.id);
  if (isNaN(userId)) {
    return res.sendStatus(400); // Bad request
  }
  const findUserIndex = users.findIndex((user) => user.id === userId);
  if (findUserIndex === -1) return res.sendStatus(404);

  users[findUserIndex] = { id: userId, ...body };
  return res.sendStatus(200);
});

router.patch("/api/users/:id", findIndexByUserId, (req, res) => {
  // const { body, params } = req;
  // const userId = parseInt(params.id);
  // if (isNaN(userId)) {
  //   return res.sendStatus(400); // Bad request
  // }
  // const findUserIndex = users.findIndex((user) => user.id === userId);
  // if (findUserIndex === -1) return res.sendStatus(404);

  const { body, findUserIndex } = req;

  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.sendStatus(400); // Bad request
  }
  const findUserIndex = users.findIndex((user) => user.id === userId);
  if (findUserIndex === -1) return res.sendStatus(404);

  users.splice(findUserIndex, 1);

  return res.sendStatus(200);
});

export default router;
