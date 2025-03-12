const { response } = require("express");
const { request } = require("express");
const jwt = require("jsonwebtoken");
const validateJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There is no Token in the request.",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token.",
    });
  }

  next();
};

module.exports = { validateJWT };
