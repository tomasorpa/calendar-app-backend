import { connectDB } from "../../../lib/db";
import { loginUser } from "../../../controllers/auth";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ msg: "Method Not Allowed" });

  const { email, password } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ ok: false, msg: "Valid email is required" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ ok: false, msg: "Password must be at least 6 characters" });
  }

  await connectDB();
  return loginUser(req, res);
}
