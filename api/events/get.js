import { connectDB } from "../../lib/db";
import { getEvents } from "../../controllers/events";
import { validateJWT } from "../../middlewares/validateJwt";


export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ msg: "Method Not Allowed" });
  await connectDB();

  const uid = await validateJWT(req);
  if (!uid) return res.status(401).json({ msg: "Unauthorized" });
  req.uid = uid;

  return getEvents(req, res);
}
