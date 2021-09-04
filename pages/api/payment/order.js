import userProtect from "./../../../src/middlewares/userProtect";
import nc from "next-connect";
import onError from "../../../src/middlewares/onError";
import onNoMatch from "../../../src/middlewares/onNoMatch";
import dbConnectMiddleware from "../../../src/middlewares/dbConnectMiddleware";
import Razorpay from "razorpay";

const order = nc({ onError, onNoMatch })
  .use(dbConnectMiddleware)
  .use(userProtect)
  .post(async (req, res) => {
    try {
      let instance = new Razorpay({
        key_id: process.env.PAYMENT_KEY_ID,
        key_secret: process.env.PAYMENT_KEY_SECRET,
      });

      const options = {
        amount: 150,
        currency: "INR",
        receipt: "delivery_recipt",
      };

      instance.orders.create(options, function(err, order) {
        if(err) {
          console.log(err);
          console.log(err.message);
        }

        res.json({
          id: order.id,
          amount: order.amount,
        });

      })

    } catch (err) {
      console.log(err.message);
      console.log(err);
      res.status(500).json({ message: err.message })
    }
  });

export default order;
