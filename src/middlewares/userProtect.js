import jwt from "jsonwebtoken";

/**
 * next-connect middleware to check whether requester is authorized for the route or not
 */
const userProtect = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  
  try {
    const token = req.cookies.authentication;

    if(!token) {
      throw new Error("Authorization token not found")
    }
    const tokenInfo = jwt.verify(token, secret);
    console.log("Token Info: ", tokenInfo);
    if(tokenInfo.role !== "user" && tokenInfo.role !== "admin") {
      throw new Error("User not Authorized to access this route")
    }
  } catch (error) {
    throw error
  }

  next();
}

export default userProtect;