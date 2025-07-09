import { connectDB } from "../../../lib/db";
import { updateEvent } from "../../../controllers/events";
import { validateJWT } from "../../../middlewares/validateJWT";

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ msg: "Method Not Allowed" });

  const { title, start, end } = req.body;
  if (!title || !start || !end) {
    return res.status(400).json({ ok: false, msg: "All fields are required" });
  }

  await connectDB();

  const { valid, uid, name, error } = await validateJWT(req);
  if (!valid) return res.status(401).json({ ok: false, msg: error });

  req.uid = uid;
  req.name = name;

  req.params = { id: req.query.id };

  return updateEvent(req, res);
}
