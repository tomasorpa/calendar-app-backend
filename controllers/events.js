const { response, request } = require("express");
const Event = require("../../models/Event");
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return res.status(201).json({
    ok: true,
    msg: "get event",
    events,
  });
};
const createEvent = async (req, res = response) => {
  try {
    const event = new Event(req.body);
    event.user = req.uid;
    const eventSaved = await event.save();
    return res.status(200).json({
      event: eventSaved,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your provider.",
    });
  }
};
const updateEvent = async (req, res = response) => {
  const id = req.params.id;
  try {
    const eventToUpdate = await Event.findById(id);

    if (!eventToUpdate) {
      return res.status(404).json({
        ok: false,
        msg: "Event does not exist.",
      });
    }
    if (eventToUpdate.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to update an event which is not yours.",
      });
    }
    const newEvent = {
      ...req.body,
    };
    const event = await Event.findByIdAndUpdate(id, newEvent, { new: true });

    return res.status(200).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your provider.",
    });
  }
};
const deleteEvent = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    const eventToDelete = await Event.findById(id);
    if (!eventToDelete) {
      return res.status(404).json({
        ok: false,
        msg: "Event does not exist",
      });
    }

    if (eventToDelete.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not allowed to delete an event which is not yours",
      });
    }
    await Event.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your provider.",
    });
  }

  return res.status(201).json({
    ok: true,
    msg: "delete event",
  });
};

module.exports = { getEvents, createEvent, deleteEvent, updateEvent };
