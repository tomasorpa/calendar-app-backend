const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
EventSchema.method("toJSON", function () {
  const { __v, _id, ...eventObj } = this.toObject();
  eventObj.eventId = _id;
  return eventObj;
});
module.exports = model("Event", EventSchema);
