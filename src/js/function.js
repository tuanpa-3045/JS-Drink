export const getLocal = (value, defaultValue = []) => {
  return JSON.parse(localStorage.getItem(value)) || defaultValue;
};

export const setLocal = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const formatNumber = (value) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
