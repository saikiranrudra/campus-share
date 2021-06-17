import dbConnect from "../../../src/utils/dbConnect";
import User from "./../../../src/Model/User";
import Factory from "./../../../src/utils/Factory";

const user = async (req, res) => {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        res.status(200).json(await Factory.getByCondition(User, req.body));
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
      }
      break;
    case "POST":
      try {
        res.status(201).json(await Factory.create(User, req.body));
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
      }
      break;
    case "PUT":
      try {
        res
          .status(200)
          .json(await Factory.findByIdAndUpdate(User, req.body._id, req.body));
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
      }
      break;
    case "DELETE": {
      try {
        await Factory.findByIdAndDelete(User, req.body._id);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
      }
      break;
    }
    default:
      res.status(404).json({ message: "Route not found" });
  }
};

export default user;
