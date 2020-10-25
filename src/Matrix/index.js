import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Cell from './Cell';
import {initialAddMatrixAction, addRowAction, deleteRowAction} from '../actions';
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

const Matrix = ({M, N, X, matrix, rowsSums, columnsAverages, initialAddMatrix, addRow, deleteRow, className}) => {
  const [warnings, setWarnings] = useState([]);

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

  return (
    <div className={className}>
      {warnings.length > 0 && <div className='warnings'>{warnings.map(warning => <div className='warnings__item'>{warning}</div>)}</div>}
      {Object.entries(matrix).map(([rowIndex, rowData]) => (
        <div key={rowIndex} className="matrix__row">
          {rowData.map((value, cellIndex) =>(
            <Cell
              key={cellIndex}
              value={value}
              rowIndex={rowIndex}
              cellIndex={cellIndex} />
          ))}
          <Cell
            key={rowIndex}
            value={rowsSums[rowIndex]} />
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
}

Matrix.propTypes = {
  M: PropTypes.number,
  N: PropTypes.number,
  X: PropTypes.number,
  matrix: PropTypes.object,
  initialAddMatrix: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);