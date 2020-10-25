import * as actionTypes from '../actions/actionTypes';


const getRowsSums = (matrixObject) => Object.fromEntries(Object.entries(matrixObject)
    .map(([index, valuesArray]) => [index, valuesArray.reduce((el, acc) => el + acc, 0)]));


const getColumnSums = (matrixArray) => {
  const columnSums = [];
  
  for (let i = 0; i < matrixArray[0].length; i++) {
    const sum = matrixArray.map((valuesArray) => valuesArray[i]).reduce((el, acc) => el + acc, 0)
    columnSums.push(sum);
  }

  return columnSums;
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

const getUpdatedMatrixWithoutRow = (matrix, rowIndex) => {
  const matrixClone = JSON.parse(JSON.stringify(matrix));
  delete matrixClone[rowIndex];

  return matrixClone;
}

const getUpdatedRowsSumsWithoutRow = (rowsSums, rowIndex) => {
  const rowsSumsClone = {...rowsSums};
  delete rowsSumsClone[rowIndex];

  return rowsSumsClone;
}

// const getUpdatedMatrixWithNewCell = (matrix, { rowIndex, columnIndex, newValue }) => {
//   const matrixClone = JSON.parse(JSON.stringify(matrix));
//   matrixClone[rowIndex][columnIndex] = newValue;

//   return matrixClone;
// }


const initialState = {
  matrix: {},
  rowsSums: {},
  columnsSums: [],
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
        columnsSums: getColumnSums(matrixArray)
      };
    case actionTypes.ADD_ROW:
      const newRowIndex = getLastMatrixIndex(state.matrix) + 1;
      updatedMatrix = getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload);

      return {
        ...state,
        matrix: getUpdatedObjectWithNewValue(state.matrix, newRowIndex, action.payload),
        rowsSums: getUpdatedObjectWithNewValue(state.rowsSums, newRowIndex, action.payload.reduce((el, acc) => el + acc, 0)),
        columnsSums: getColumnSums(Object.values(updatedMatrix)),
      }
    case actionTypes.DELETE_ROW:
      updatedMatrix = getUpdatedMatrixWithoutRow(state.matrix, action.payload);
      const updatedRowsSums = getUpdatedRowsSumsWithoutRow(state.rowsSums, action.payload);

      return {
        ...state,
        matrix: updatedMatrix,
        rowsSums: updatedRowsSums,
        columnsSums: getColumnSums(Object.values(updatedMatrix)),
      }
      
      
      // { ...state, matrix: getUpdatedMatrixWithoutRow(state.matrix, action.payload)};


    // case actionTypes.UPDATE_MATRIX_CELL: return { ...state, matrix: getUpdatedMatrixWithNewCell(state, {...action.payload})};
    default: return state;
  }
}

export default matrixReducer;