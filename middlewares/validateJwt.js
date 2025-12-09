import jwt from "jsonwebtoken";

export async function validateJWT(req) {
  const token = req.headers["x-token"];

  if (!token) {
    return { valid: false, error: "There is no token in the request." };
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    return { valid: true, uid, name };
  } catch (err) {
    return { valid: false, error: "Invalid token." };
  }
}
