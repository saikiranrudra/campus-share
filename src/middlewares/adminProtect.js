import jwt from "jsonwebtoken";

/**
 * next-connect middleware check whether requester is admin or not
 */
const adminProtect = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  
  try {
    const token = req.cookies.authentication;

    if(!token){
      return res.status(400).json({ message: "Authentication token not found" })
    }
    const tokenInfo = jwt.verify(token, secret);

    if(tokenInfo.role !== "admin") {
      return res.status(401).json({ message: "User is not Authorized to access this route" })
    } 
  } catch (error) {
    throw error
  }
  next();
}

export default adminProtect;