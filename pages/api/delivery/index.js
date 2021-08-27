import Delivery from "./../../../src/Model/Delivery";
import Factory from "./../../../src/utils/Factory";
import userProtect from "./../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";
import deliveryFilterKeys from "../../../src/utils/Filters/deliveryFilterKeys";

const delivery = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(async (req, res) => {
    res.status(201).json(await Factory.create(Delivery, req.body));
  })
  .get(async (req, res) => {
    const filter = { ...req.query };
    filter.populate = ["reciver", "owner", "deliveryPerson", "transections"];
    res
      .status(200)
      .json(
        await Factory.getByCondition(
          Delivery,
          filter,
          deliveryFilterKeys
        )
      );
  })
  .put(async (req, res) =>
    res
      .status(200)
      .json(await Factory.findByIdAndUpdate(Delivery, req.body._id, req.body))
  )
  .delete(async (req, res) => {
    res.status(204).json(await Factory.findByIdAndDelete(Delivery, req.query._id));
  });

export default delivery;