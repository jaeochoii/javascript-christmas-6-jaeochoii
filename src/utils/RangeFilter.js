import MESSAGE from "../constant/Message.js";
import NUMBER from "../constant/Number.js";

const RangeFilter = {
  date(input) {
    return input < NUMBER.minDate || input > NUMBER.maxDate;
  },

  badge(cost) {
    if (cost >= NUMBER.starBenefit && cost < NUMBER.treeBenefit)
      return MESSAGE.starBadge;
    if (cost >= NUMBER.treeBenefit && cost < NUMBER.santaBenefit)
      return MESSAGE.treeBadge;
    if (cost >= NUMBER.santaBenefit) return MESSAGE.santaBadge;
  },
};

export default RangeFilter;
