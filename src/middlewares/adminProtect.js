import jwt from "jsonwebtoken";

/**
 * next-connect middleware check whether requester is admin or not
 */
const adminProtect = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if(!authorization) {
      throw new Error("Authorization token not found")
    }

    const token = authorization.split(' ')[1];
    
    const secret = process.env.secret;
    const tokenInfo = jwt.verify(token, secret);

    if(tokenInfo.role !== "admin") {
      throw new Error("User not Authorized to access this route")
    }
  } catch(error) {
    throw error;
  }

  next();
}

export default adminProtect;