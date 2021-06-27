import Logger from "../utils/Logger";
const onError = (err, req, res, next) => {
  Logger.error(err);
  // Use Error Logger here
  if(err.message.includes("E11000")) {
    const index = err.message.match(/({\s|,\s)\w+:/)[0];
    return res.status(400).json({
      message: `record with this already exist ${index.substr(2, index.length - 3)}`,
    })
  }
  res.status(500).json({ 
    message: err.message,
  })
}

export default onError;