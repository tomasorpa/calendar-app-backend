const { isBefore } = require("date-fns");

const isEndDateBefore = (end, start) => {
    
  if (!isBefore(start, end)) return false;
  return true;
};
module.exports = { isEndDateBefore };
