import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User.js";

passport.serializeUser((user, done) => {
  console.log("Serialized user:", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserialized user:", id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

// user varification
export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(username);
    console.log(password);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid credentials");
      done(null, findUser); // null for error
    } catch (err) {
      done(err, null); // null for user
    }
  })
);
