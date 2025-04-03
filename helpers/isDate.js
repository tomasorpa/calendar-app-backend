const { isValid, getTime } = require("date-fns");

const isDate = (value) => {
  if (!value) return false;
  const time = getTime(value);
  const date = isValid(time);
  return date;
};

module.exports = { isDate };
