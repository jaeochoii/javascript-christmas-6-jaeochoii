import BADGE from "../constant/Badge.js";
import NUMBER from "../constant/Number.js";

const RangeFilter = {
  date(input) {
    return input < NUMBER.minDate || input > NUMBER.maxDate;
  },

  badge(cost) {
    if (cost < NUMBER.starBenefit) return 0;
    if (cost >= NUMBER.starBenefit && cost < NUMBER.treeBenefit)
      return BADGE.star;
    if (cost >= NUMBER.treeBenefit && cost < NUMBER.santaBenefit)
      return BADGE.tree;
    if (cost >= NUMBER.santaBenefit) return BADGE.santa;
  },
};

export default RangeFilter;
