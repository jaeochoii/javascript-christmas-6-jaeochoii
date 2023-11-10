import NUMBER from "../constant/Number.js";

function RangeFilter(input) {
  return input < NUMBER.minDate || input > NUMBER.maxDate;
}

export default RangeFilter;
