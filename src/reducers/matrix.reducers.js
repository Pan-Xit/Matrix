import * as actionTypes from '../actions/actionTypes';

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
}

const matrixReducer = (state = initialState, action) => {
  let updatedMatrix;
  switch (action.type) {
    case actionTypes.INITIAL_ADD_MATRIX: return { ...state, matrix: action.payload };
    case actionTypes.ADD_ROW:
      const newRowIndex = getLastMatrixIndex(state.matrix) + 1;
      updatedMatrix = getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload);

      return { ...state, matrix: getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload) }
    case actionTypes.DELETE_ROW:
      updatedMatrix = getUpdatedObjectWithourRow(state.matrix, action.payload);

      return { ...state, matrix: updatedMatrix }
    case actionTypes.UPDATE_MATRIX_CELL:
      updatedMatrix = getUpdatedMatrixWithNewCellValue(state.matrix, {...action.payload});

      return { ...state, matrix: updatedMatrix }
    default: return state;
  }
}

export default matrixReducer;