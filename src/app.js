import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser("secretkey"));
app.use(
  session({
    secret: "cola123^-sk789",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);
app.use(routes);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(req.session);
  // Session {
  //   cookie: {
  //     path: '/',
  //     _expires: 2024-10-25T12:38:33.577Z,
  //     originalMaxAge: 360000,
  //     httpOnly: true
  //   }
  // }
  console.log(req.session.id); // yEq6aKHIz6gqHS4arghsANTHEkYLMxvb
  req.session.visited = true;
  // res.cookie("hello", "world", { maxAge: 6000 * 2, signed: true }); // cookie name & cookie value
  return res.status(201).send("Session is set.");
});

app.listen(port, () => {
  console.warn(`Server is running at http://localhost:${port}`);
});
