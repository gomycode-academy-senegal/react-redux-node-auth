const User = require("../models/user.model");

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  const user = await User.create({ pseudo, email, password });
  res.status(201).json({ user: user._id });
};

