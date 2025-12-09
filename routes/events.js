const { Router } = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../api/controllers/events");
const { validateJWT } = require("../middlewares/validateJwt");
const { isDate } = require("../helpers/isDate");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { isEndDateBefore } = require("../helpers/isEndDateBefore");

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "Title must not be empty").not().isEmpty(),
    check("start", "Start date must be a valid date").custom(isDate),
    check("end", "End date must be a valid date").custom(isDate),
    check("start", "End date cannot be before than start date").custom(
      (start, { req }) => isEndDateBefore(req.body.end, start)
    ),
    validateFields,
  ],
  createEvent
);
router.put(
  "/:id",
  check("title", "Title must not be empty").not().isEmpty(),
  check("start", "Start date must be a valid date").custom(isDate),
  check("end", "End date must be a valid date").custom(isDate),
  check("start", "End date cannot be before than start date").custom(
    (start, { req }) => isEndDateBefore(req.body.end, start)
  ),
  validateFields,
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
