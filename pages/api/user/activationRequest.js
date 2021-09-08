import userProtect from "../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";
import User from "../../../src/Model/User";
import ActivationRequest from "../../../src/Model/ActivationRequest";
import Logger from "../../../src/utils/Logger";

const activationRequest = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(async (req, res) => {
    try {
      console.log("Request Body", req.body);
      const { adhaarCard, collegeId, userPhoneWithCollegeAndAdhaarCard, email } =
        req.body;
  
      if (!adhaarCard || !collegeId || !userPhoneWithCollegeAndAdhaarCard) {
        res.status(400).json({ message: "All three images are required" });
        return;
      }
  
      if (!email) {
        res.status(400).json({ message: "Unable to find user" });
        return;
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(401).json({
          message: "User not found",
        });
        return;
      }
  
      await User.findByIdAndUpdate(user._id, {
        adhaarId: adhaarCard,
        collegeId,
        proofImage: userPhoneWithCollegeAndAdhaarCard,
      });
      await ActivationRequest.create({ user: user._id });
      res.status(200).json({ message: "Request Placed Successfully" });
    } catch(err) {
      console.log(err);
      console.log(err.message);
      res.status(500).json({ message: "Something went wrong!" });
      return;
    }
  })
  .get(async (req, res) => {
    const query = req.query;
    if (!query || !query._id) {
      Logger.log("_id is not defined");
      console.log("Query", query);
      res.status(400).json({ message: "user not defined" });
      return;
    }
    const { _id } = query;
    const activationRequest = await ActivationRequest.findOne({ user: _id });

    if (!activationRequest) {
      res.status(200).json({
        isRequestPlaced: false,
      });
      return;
    }

    res.status(200).json({
      isRequestPlaced: true,
    });
  });

export default activationRequest;
