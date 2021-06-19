const onNoMatch = (req, res) => {
  res.status(404).json({ message: `API Route with ${req.method} method not found` });
}

export default onNoMatch;