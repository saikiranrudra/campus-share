import jwt from "jsonwebtoken";

/**
 * next-connect middleware to check whether requester is authorized for the route or not
 */
const userProtect = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  
  try {
    const token = req.cookies.authentication;

    if(!token) {
      return res.status(400).json({ message: "Authentication token not found" })
    }
    const tokenInfo = jwt.verify(token, secret);
    
    if(tokenInfo.role !== "user" && tokenInfo.role !== "admin") {
      return res.status(401).json({ message: "User is not Authorized to access this route" })
    }
  } catch (error) {
    throw error
  }

  next();
}

export default userProtect;