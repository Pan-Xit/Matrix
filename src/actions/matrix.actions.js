import * as actionTypes from './actionTypes';


export const initialAddMatrixAction = (matrix) => ({
  type: actionTypes.INITIAL_ADD_MATRIX,
  payload: matrix
});

export const updateMatrixCellAction = (rowIndex, colIndex, increment) => ({
  type: actionTypes.UPDATE_MATRIX_CELL,
  payload: {
    rowIndex,
    colIndex,
    increment
  }
});

export const addRowAction = (newRowValues) => ({
  type: actionTypes.ADD_ROW,
  payload: newRowValues
});

export const deleteRowAction = (rowIndex) => ({
  type: actionTypes.DELETE_ROW,
  payload: rowIndex
});


