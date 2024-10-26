import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/usersData.js";

passport.serializeUser((user, done) => {
  console.log("Serialized user:", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialized user:", id);
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

// user varification
export default passport.use(
  new Strategy((username, password, done) => {
    console.log(username);
    console.log(password);
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid credentials");
      done(null, findUser); // null for error
    } catch (err) {
      done(err, null); // null for user
    }
  })
);

// passport.use(
//   new Strategy({ usernameField: "email" }, (username, password, done) => {})
// );
