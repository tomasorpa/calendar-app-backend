import { connectDB } from "../../../lib/db";
import { createEvent } from "../../../controllers/events";
import { validateJWT } from "../../../middlewares/validateJWT";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ msg: "Method Not Allowed" });

  const { title, start, end, notes } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ ok: false, msg: "Title is required" });
  }

  if (!start || !end) {
    return res
      .status(400)
      .json({ ok: false, msg: "Start and end dates are required" });
  }

  await connectDB();

  const { valid, uid, name, error } = await validateJWT(req);
  if (!valid) return res.status(401).json({ ok: false, msg: error });

  req.uid = uid;
  req.name = name;

  return createEvent(req, res);
}
