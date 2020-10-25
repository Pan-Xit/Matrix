import * as actionTypes from '../actions/actionTypes';


const getRowsSums = (matrixArray) => matrixArray
  .map((valuesArray) => valuesArray.reduce((el, acc) => el + acc, 0));


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

  return keys[keys.length - 1];
}


// const getUpdatedMatrixWithNewCell = (matrix, { rowIndex, columnIndex, newValue }) => {
//   const matrixClone = JSON.parse(JSON.stringify(matrix));
//   matrixClone[rowIndex][columnIndex] = newValue;

//   return matrixClone;
// }

// const getUpdatedMatrixWithNewRow = (matrix, newRowValues) => {
//   const matrixClone = JSON.parse(JSON.stringify(matrix));
//   matrixClone[getLastMatrixIndex(matrixClone) + 1] = newRowValues; 

//   return matrixClone;
// }

// const getUpdatedMatrixWithoutRow = (matrix, rowIndex) => {
//   const matrixClone = JSON.parse(JSON.stringify(matrix));
//   delete matrixClone[rowIndex];

//   return matrixClone;
// }

const initialState = {
  matrix: {},
  rowsSums: [],
  columnsSums: [],
}

const matrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIAL_ADD_MATRIX:
      const matrixArray = Object.values(action.payload);
      return { 
        ...state,
        matrix: action.payload,
        rowsSums: getRowsSums(matrixArray),
        columnsSums: getColumnSums(matrixArray)
      };
    // case actionTypes.UPDATE_MATRIX_CELL: return { ...state, matrix: getUpdatedMatrixWithNewCell(state, {...action.payload})};
    // case actionTypes.ADD_ROW: return { ...state, matrix: getUpdatedMatrixWithNewRow(state, action.payload)};
    // case actionTypes.DELETE_ROW: return { ...state, matrix: getUpdatedMatrixWithoutRow(state, action.payload)};
    default: return state;
  }
}

export default matrixReducer;