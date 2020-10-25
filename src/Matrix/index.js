import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Cell from './Cell';
import {initialAddMatrixAction} from '../actions';
import {matrixSelector, rowsSumsSelector, columnsSumsSelector} from '../selectors';


const getRandomNumber = (from = 100, to = 999) => Math.trunc(from + Math.random() * (to - from))

const generateMatrix = (M, N) => {

  const matrixObject = {}

  for (let i = 0; i < M; i++) {
    matrixObject[i] = new Array(N).fill(0).map(el => getRandomNumber())
  }
  
  return matrixObject;
}

const Matrix = ({M, N, X, matrix, rowsSums, columnsSums, initialAddMatrix, className}) => {
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
            key={`row-sum-${rowIndex}`}
            value={rowsSums[rowIndex]} />
        </div>
      ))}
      <div key={'column-sums'} className="matrix__row">
        {columnsSums.map((sum, index) => <Cell key={`column-sum-${index}`} value={sum} />)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  matrix: matrixSelector(state),
  rowsSums: rowsSumsSelector(state),
  columnsSums: columnsSumsSelector(state)
});

const mapDispatchToProps = {
  initialAddMatrix: (matrix) => initialAddMatrixAction(matrix)
}

Matrix.propTypes = {
  M: PropTypes.number,
  N: PropTypes.number,
  X: PropTypes.number,
  matrix: PropTypes.object,
  initialAddMatrix: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);