import nc from "next-connect";
import dbConnectMiddleware from "./dbConnectMiddleware";
import onError from "./onError";
import onNoMatch from "./onNoMatch";

export default nc({ onError, onNoMatch  }).use(dbConnectMiddleware)