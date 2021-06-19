import dbConnect from "./../utils/dbConnect";
export default async (req, res, next) => {
  await dbConnect();
  next();
}