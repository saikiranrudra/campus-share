import { serialize } from "cookie";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";

const signout = nc({ onError, onNoMatch })
.use(dbConnectMiddleware)
.post(async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize("authentication", '', {
      httpOnly: true,
      maxAge: -1,
      secure: process.env.isHTTPS,
      path: "/"
    })
  );

  res.writeHead(302, { Location: '/auth/signin' });
  res.end();
})

export default signout;