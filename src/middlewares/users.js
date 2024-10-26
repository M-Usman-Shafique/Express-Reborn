import { users } from "../utils/usersData.js";

export const findIndexByUserId = (req, res, next) => {
  const { params } = req;
  const userId = parseInt(params.id);
  if (isNaN(userId)) {
    return res.sendStatus(400);
  }
  const findUserIndex = users.findIndex((user) => user.id === userId);
  if (findUserIndex === -1) return res.sendStatus(404);

  req.findUserIndex = findUserIndex;
  next();
};
