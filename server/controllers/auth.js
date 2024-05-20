const User = require("../models/User");

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Please provide username and password" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "Invalid username or password!" });
  }
  const compare = await user.comparePassword(password);
  if (!compare) {
    return res.json({ error: "Incorrect password!" });
  }
  try {
    const token = user.createToken();
    res.status(201).json({ user, token: token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const Register = async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
    isAdmin,
  });
  try {
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { Register, Login, getUsers };
