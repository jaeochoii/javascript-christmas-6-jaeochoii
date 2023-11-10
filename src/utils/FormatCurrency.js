function FormatCurrency(cost) {
  return String(cost).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default FormatCurrency;
