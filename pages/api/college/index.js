import College from "./../../../src/Model/College";
import Factory from "./../../../src/utils/Factory";
import adminProtect from "./../../../src/middlewares/adminProtect";
import nc from "next-connect";
import onError from "./../../../src/middlewares/onError";
import onNoMatch from "./../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "./../../../src/middlewares/dbConnectMiddleware";

const college = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .get(async (req, res) =>
    res
      .status(200)
      .json(
        await Factory.getByCondition(College, req.query)
      )
  )
  .post(async (req, res) =>
    res.status(201).json(await Factory.create(College, req.body))
  )
  .use(adminProtect)
  .put(async (req, res) =>
    res
      .status(200)
      .json(await Factory.findByIdAndUpdate(College, req.body._id, req.body))
  )
  .delete(async (req, res) =>
    res.status(204).json(await Factory.findByIdAndDelete(College, req.body._id))
  );

export default college;
