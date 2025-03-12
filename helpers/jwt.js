const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("We could not generate the Token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
