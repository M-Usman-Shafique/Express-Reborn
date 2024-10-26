import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie); // hello=world (unparsed)
  console.log(req.signedCookies); // {hello: 'world'} (parsed via cookie-parser)
  // console.log(req.cookies.hello); // world
  console.log(req.signedCookies.hello); // world

  if (req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.send([{ id: 123, name: "Rolex", price: 12.99 }]);
  }

  return res.send({ msg: "You are not authorized for this request." });
});

export default router;
