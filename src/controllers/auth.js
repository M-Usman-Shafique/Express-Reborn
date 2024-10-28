export const login = (req, res) => {
  return res.sendStatus(200);
};

export const isAuth = (req, res) => {
  // console.log(req.user);

  console.log(req.session);

  return req.user ? res.send(req.user) : res.sendStatus(401);
};

export const logout = (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    return res.send(200);
  });
};
