import userProtect from "../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";
import User from "../../../src/Model/User";

const activationRequest = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(async (req, res) => {
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

    await User.findOneAndUpdate(
      { email },
      {
        adhaarId: adhaarCard,
        collegeId,
        proofImage: userPhoneWithCollegeAndAdhaarCard,
      }
    );

    res.status(200).json({ message: "Request Placed Successfully" });
  });

export default activationRequest;
