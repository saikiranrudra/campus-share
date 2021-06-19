const onError = (err, req, res, next) => {
  console.log(err);
  // Use Error Logger here
  res.status(500).json({ 
    message: err.message,
    err: err.toString()
  })
}

export default onError;