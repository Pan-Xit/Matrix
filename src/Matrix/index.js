import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Cell from './Cell';
import {initialAddMatrixAction, addRowAction, deleteRowAction, updateMatrixCellAction} from '../actions';
import {matrixSelector, rowsSumsSelector, columnsAveragesSelector} from '../selectors';


const getRandomNumber = (from = 100, to = 999) => Math.trunc(from + Math.random() * (to - from));

const generateMatrixRow = (N) => new Array(N).fill(0).map(el => getRandomNumber())

const generateMatrix = (M, N) => {

  const matrixObject = {}

  for (let i = 0; i < M; i++) {
    matrixObject[i] = generateMatrixRow(N)
  }
  
  return matrixObject;
}

const findXNearest = (matrixArray, currentValue, X) => {
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

const Matrix = ({M, N, X, matrix, rowsSums, columnsAverages, initialAddMatrix, addRow, deleteRow, updateCell, className}) => {
  const [warnings, setWarnings] = useState([]);
  const [nearest, setNearest] = useState([]);
  const [percentagesRow, setPercentagesRow] = useState({})
  // const [localMatrix, setLocalMatrix] = useState(matrix);

  // Pass init data
  useEffect( () => { M && N && initialAddMatrix(generateMatrix(M, N)) }, [] );

  if (!M || !N) {
    const errors = [];

    !M && errors.push('Missing matrix rows');
    !N && errors.push('Missing matrix columns');

    return (
      <div className='errors'>
        {errors.map(error => <div className='errors__item'>{error}</div>)}
      </div>
    );
  }
  
  if (warnings.length === 0 && !X) {
    setWarnings(['Missing amount of nearest values'])
  }

  const onDataCellHover = (cellData) => {
    const nearestsVals = findXNearest(Object.values(matrix), cellData, X);
    setNearest(nearestsVals);
  }

  const onDataCellLeave = (e) => {
    setNearest([]);
  }

  const onSumCellHover = (rowIndex, sum) => {
    const rowValues =  matrix[rowIndex];
    setPercentagesRow({
      [rowIndex]: rowValues.map(data => Math.trunc((data / sum) * 100))
    });
  }

  const onSumCellLeave = () => {
    setPercentagesRow({});
  } 

  return (
    <div className={className}>
      {warnings.length > 0 && <div className='warnings'>{warnings.map(warning => <div className='warnings__item'>{warning}</div>)}</div>}
      {Object.entries(matrix).map(([rowIndex, rowData]) => (
        <div key={rowIndex} className="matrix__row">
          {percentagesRow[rowIndex] ?
            percentagesRow[rowIndex].map((value, cellIndex) => (
              <Cell
              key={cellIndex}
              value={value}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              withBackground />
            )) :
          
            rowData.map((value, cellIndex) => (
              <Cell
                key={cellIndex}
                value={value}
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                onMouseOver={() => onDataCellHover(value)}
                onMouseOut={onDataCellLeave}
                highlighted={nearest.includes(value)} />
            ))
          }
          <Cell
            key={rowIndex}
            value={rowsSums[rowIndex]}
            onMouseOver={() => onSumCellHover(rowIndex, rowsSums[rowIndex])}
            onMouseOut={onSumCellLeave} />
          <button onClick={() => deleteRow(rowIndex)}>Delete Row</button>
        </div>
      ))}
      <div key={'column-sums'} className="matrix__row">
        {columnsAverages.map((sum, index) => <Cell key={`column-sum-${index}`} value={sum} />)}
      </div>
      <button onClick={() => addRow(generateMatrixRow(N))}>Add new row</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  matrix: matrixSelector(state),
  rowsSums: rowsSumsSelector(state),
  columnsAverages: columnsAveragesSelector(state)
});

const mapDispatchToProps = {
  initialAddMatrix: (matrix) => initialAddMatrixAction(matrix),
  addRow: (rowValues) => addRowAction(rowValues),
  deleteRow: (rowIndex) => deleteRowAction(rowIndex),
  // updateCell: (rowIndex, colIndex, value) => updateMatrixCellAction(rowIndex, colIndex, value)
}


Matrix.propTypes = {
  M: PropTypes.number,
  N: PropTypes.number,
  X: PropTypes.number,
  matrix: PropTypes.object,
  initialAddMatrix: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);