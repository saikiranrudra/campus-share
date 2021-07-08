import formidable from "formidable";
import micro from "micro";
import userProtect from "../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";

const activationRequest = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(
    micro(async (req, res) => {
      const data = new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({ keepExtensions: true });

        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const result = await data();
      console.log(result);

      res.status(200).json({ message: "check logs" });
    })
  );

export const config = {
  api: {
    bodyparser: false,
  },
};

export default activationRequest;
