/*
Routes Users / Auth

host + api/auth


*/

const { Router } = require("express");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "Name can not be empty").not().isEmpty(),
    check("email", "Email is incorrect").isEmail(),
    check("password", "Password must have more than 5 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "Email is not registered").isEmail(),
    check("password", "Password must have more than 5 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);
router.get("/renew", validateJWT, renewToken);

module.exports = router;
