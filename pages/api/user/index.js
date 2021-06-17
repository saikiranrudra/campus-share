import dbConnect from "../../../src/utils/dbConnect";
import User from "./../../../src/Model/User";
import Factory from "./../../../src/utils/Factory";

const user = async (req, res) => {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      return res.status(200).json(await Factory.getByCondition(User, req.body));
    case "POST":
      return res.status(201).json(await Factory.create(User, req.body));

    case "PUT":
      res
        .status(200)
        .json(await Factory.findByIdAndUpdate(User, req.body._id, req.body));
      break;
    case "DELETE": {
      const isDeleted = await Factory.findByIdAndDelete(User, req.body._id);

      if(isDeleted) {
        res.status(204);
      } else {
        res.status(500).json({ message: "Something went wrong" })
      }
    }
    default:
      res.status(404);
  }
};

export default user;
