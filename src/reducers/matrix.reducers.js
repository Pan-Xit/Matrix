import * as actionTypes from '../actions/actionTypes';


const getRowsSums = (matrixObject) => Object.fromEntries(Object.entries(matrixObject)
    .map(([index, valuesArray]) => [index, valuesArray.reduce((el, acc) => el + acc, 0)]));


const getColumnAverage = (column) => {
  return Math.trunc(column.reduce((el, acc) => el + acc, 0) / column.length)
}

const getColumnsAverages = (matrixArray) => {
  const columnSums = [];
  const arrayLength = matrixArray[0].length;
  
  for (let i = 0; i < arrayLength; i++) {
    const average = getColumnAverage(matrixArray.map((valuesArray) => valuesArray[i]))
    columnSums.push(average);
  }

  return columnSums;
}

const updateColumnsAverages = (matrixArray, columnsAverages, updatedColumnIndex) => {
  const newCaolumnAverage = getColumnAverage(matrixArray.map((valuesArray) => valuesArray[updatedColumnIndex]));
  const columnsAveragesCopy = [...columnsAverages];
  columnsAveragesCopy[updatedColumnIndex] = newCaolumnAverage;

  return columnsAveragesCopy;
}

const getLastMatrixIndex = (matrix) => {
  const keys = Object.keys(matrix);

  return Number(keys[keys.length - 1]);
}

const getUpdatedObjectWithNewValue = (object, newIndex, newValue) => {
  const objectClone = JSON.parse(JSON.stringify(object));
  objectClone[newIndex] = newValue; 

  return objectClone;
}

const getUpdatedObjectWithourRow = (object, index) => {
  const objectClone = JSON.parse(JSON.stringify(object));
  delete objectClone[index];

  return objectClone;
}

const getUpdatedMatrixWithNewCellValue = (matrix, {rowIndex, colIndex, increment}) => {
  const matrixClone = JSON.parse(JSON.stringify(matrix));
  matrixClone[rowIndex][colIndex] += increment;

  return matrixClone;
}

const initialState = {
  matrix: {},
  rowsSums: {},
  columnsAverages: [],
}

const matrixReducer = (state = initialState, action) => {
  let updatedMatrix;
  switch (action.type) {
    case actionTypes.INITIAL_ADD_MATRIX:
      const matrixArray = Object.values(action.payload);
      return { 
        ...state,
        matrix: action.payload,
        rowsSums: getRowsSums(matrixArray),
        columnsAverages: getColumnsAverages(matrixArray)
      };
    case actionTypes.ADD_ROW:
      const newRowIndex = getLastMatrixIndex(state.matrix) + 1;
      updatedMatrix = getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload);

      return {
        ...state,
        matrix: getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload),
        rowsSums: getUpdatedObjectWithNewValue(state.rowsSums, newRowIndex, action.payload.reduce((el, acc) => el + acc, 0)),
        columnsAverages: getColumnsAverages(Object.values(updatedMatrix)),
      }
    case actionTypes.DELETE_ROW:
      updatedMatrix = getUpdatedObjectWithourRow(state.matrix, action.payload);
      const updatedRowsSums = getUpdatedObjectWithourRow(state.rowsSums, action.payload);

      return {
        ...state,
        matrix: updatedMatrix,
        rowsSums: updatedRowsSums,
        columnsAverages: getColumnsAverages(Object.values(updatedMatrix)),
      }
    case actionTypes.UPDATE_MATRIX_CELL:
      updatedMatrix = getUpdatedMatrixWithNewCellValue(state.matrix, {...action.payload});

      return {
        ...state,
        matrix: updatedMatrix,
        rowsSums: { ...state.rowsSums, [action.payload.rowIndex]: state.rowsSums[action.payload.rowIndex] + 1},
        columnsAverages: updateColumnsAverages(Object.values(updatedMatrix), state.columnsAverages, action.payload.colIndex),
      }
    default: return state;
  }
}

export default matrixReducer;