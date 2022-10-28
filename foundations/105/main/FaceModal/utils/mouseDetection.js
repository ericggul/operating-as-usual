export function mouseDetection(path) {
  function getStandardDeviation(array) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
  }

  let xArray = path.map((el) => el[0]);
  let yArray = path.map((el) => el[1]);

  // console.log(getStandardDeviation(xArray).toFixed(2), getStandardDeviation(yArray).toFixed(2));

  return getStandardDeviation(yArray);
}
