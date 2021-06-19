import User from "./../../../src/Model/User";
import Factory from "./../../../src/utils/Factory";
import router from "../../../src/middlewares/router";
import userProtect from "../../../src/middlewares/userProtect";

// middlewares
// import userProtect from "../../../src/middlewares/userProtect";\

const user = router
  .use(userProtect)
  .get(async (req, res) =>
    res.status(200).json(await Factory.getByCondition(User, req.body))
  )
  .post(async (req, res) =>
    res.status(201).json(await Factory.create(User, req.body))
  )
  .put(async (req, res) =>
    res
      .status(200)
      .json(await Factory.findByIdAndUpdate(User, req.body._id, req.body))
  )
  .delete(
    async (req, res) => res.status(204).json(await Factory.findByIdAndDelete(User, req.body._id))
  );


export default user;
