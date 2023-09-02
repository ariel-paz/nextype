export const formatMoney = (num: number) =>
  num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
