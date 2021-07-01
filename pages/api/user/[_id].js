import User from "../../../src/Model/User";
import { findById } from "../../../src/utils/Factory";
import userProtect from "../../../src/middlewares/userProtect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";
import nc from "next-connect";

const getUserById = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(async (req, res) =>
    res.status(200).json(await findById(User, req.query._id))
  );

export default getUserById;