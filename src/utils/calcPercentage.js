const calcPercentage = (a, b) => {
  const percentage = (a - b) / a * 100;
  return Math.round(percentage);
};

export default calcPercentage;
