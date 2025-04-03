const { response } = require("express");
const User = require("../models/User");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, password });
      const salt = genSaltSync();
      user.password = hashSync(password, salt);
      await user.save();

      const token = await generateJWT(user.id, user.name);
      return res.status(201).json({
        ok: true,
        msg: "User Created",
        token,
        name: user.name,
        uid: user.id,
      });
    }
    res.status(400).json({
      ok: false,
      msg: "Your email is already registered",
    });

    // let user2 = await User.findOne({ email: req.body.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the provider",
    });
  }
};
const loginUser = async (req, res = response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordMatch = compareSync(req.body.password, user.password);
      if (passwordMatch) {
        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
          ok: true,
          msg: "Login",
          token,
          uid: user.id,
          name: user.name,
        });
      }
      return res.status(401).json({
        ok: false,
        msg: "password does not match",
      });
    }
    return res.status(400).json({
      ok: false,
      msg: "Your email is not registered.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact your provider",
    });
  }
};
const renewToken = async (req, res = response) => {
  const { name, uid } = req;
  const token = await generateJWT(uid, name);

  res.status(201).json({
    ok: true,
    msg: "Token Renewed",
    token,
    uid,
    name,
  });
};
module.exports = { createUser, loginUser, renewToken };
