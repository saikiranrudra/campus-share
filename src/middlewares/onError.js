import Logger from "../utils/Logger";
const onError = (err, req, res, next) => {
  // Use Error Logger here
  if(err.code === 11000) {
    res.status(400).json({
      message: `${Object.keys(err.keyPattern)[0]} already exist`,
    })
  } else {
    res.status(500).json({ 
      message: err.message,
    })
  }
}

export default onError;