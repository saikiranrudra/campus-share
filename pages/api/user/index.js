import User from "./../../../src/Model/User";
import Factory from "./../../../src/utils/Factory";
import userProtect from "../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "./../../../src/middlewares/onError";
import onNoMatch from "./../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "./../../../src/middlewares/dbConnectMiddleware";
import userFilterKeys from "./../../../src/utils/Filters/userFilterKeys";

const user = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .post(async (req, res) =>
    res.status(201).json(await Factory.create(User, req.body))
  )
  .use(userProtect)
  .get(async (req, res) => {
    const filter = { ...req.query };
    filter.populate = ["college"];
    res
      .status(200)
      .json(await Factory.getByCondition(User, filter, userFilterKeys));
  })
  .put(async (req, res) =>
    res
      .status(200)
      .json(await Factory.findByIdAndUpdate(User, req.body._id, req.body))
  )
  .delete(async (req, res) =>
    res.status(204).json(await Factory.findByIdAndDelete(User, req.body._id))
  );

export default user;
