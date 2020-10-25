const getRandomNumber = (from = 100, to = 999) => Math.trunc(from + Math.random() * (to - from));

export const generateMatrixRow = (N) => new Array(N).fill(0).map(el => getRandomNumber())

export const generateMatrix = (M, N) => {

  const matrixObject = {}

  for (let i = 0; i < M; i++) {
    matrixObject[i] = generateMatrixRow(N)
  }
  
  return matrixObject;
}

export const findXNearest = (matrixArray, currentValue, X) => {
  const arr = [...new Set(matrixArray.flat())].sort();

  const currentValIndex = arr.indexOf(currentValue);
  const nearests = [];

  let nextVal;
  let prevVal;
  for (let i = 0; i < X + 1; i++) {
    if (!nextVal) {
      nextVal = arr[currentValIndex + i] ?
        Math.abs(arr[currentValIndex + i] - arr[currentValIndex]) :
        Infinity
    }

    if (!prevVal) {
      prevVal = arr[currentValIndex - i] ?
        Math.abs(arr[currentValIndex - i] - arr[currentValIndex]) :
        Infinity
    }

    if (prevVal > nextVal) {
      nearests.push(arr[currentValIndex + i]);
      nextVal = null;
      continue;
    }

    nearests.push(arr[currentValIndex - i]);
    prevVal = null;
  }

  return nearests;
}