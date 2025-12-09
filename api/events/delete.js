import { connectDB } from "../lib/db";
import { deleteEvent } from "../controllers/events";
import { validateJWT } from "../../../middlewares/validateJWT";

export default async function handler(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).json({ msg: "Method Not Allowed" });
  await connectDB();

  const uid = await validateJWT(req);
  if (!uid) return res.status(401).json({ msg: "Unauthorized" });
  req.uid = uid;

  // add id from query to params
  req.params = { id: req.query.id };

  return deleteEvent(req, res);
}
