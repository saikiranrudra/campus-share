import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import User from "./../../../src/Model/User";
import router from "../../../src/middlewares/router";

const signin = router.post(async (req, res) => {
  const { email: candidateEmail, password: candidatePassword } = req.body;

  console.log("Email: ", candidateEmail, "Password: ", candidatePassword)
  const user = await User.findOne(
    { email: candidateEmail },
    "email password role"
  ).exec();

  if (!user) {
    res.status(401).json({ message: "user not found" });
    res.end();
    return;
  }

  const { email, password, role } = user;

  const result = user.verifyPassword(candidatePassword, password);

  if (result) {
    // User is authenticated
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
    const token = await sign({ email, role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE_IN,
    });

    res.setHeader(
      "Set-Cookie",
      serialize("authentication", String(token), {
        httpOnly: true,
        maxAge: process.env.COOKIE_EXPIRE_IN,
        secure: process.env.isHTTPS,
        path: '/'
      })
    );

    res.status(200).json({ message: "Successfully Authenticated!" });
  } else {
    // User not authenticated
    res.status(401).json({ message: "Authentication failed" });
  }
  res.end();
});

export default signin;
