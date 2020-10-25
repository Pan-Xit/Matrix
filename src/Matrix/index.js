import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Cell from './Cell';
import {initialAddMatrixAction, addRowAction, deleteRowAction} from '../actions';
import {matrixSelector} from '../selectors';
import {generateMatrix, findXNearest, generateMatrixRow} from './utils';


const StyledBtn = styled.button`
  border-width: 1px;
  border-radius: 4px;
  cursor: pointer;
`

const StyledDeleteBtn = styled(StyledBtn)`
  background-color: lightcoral;
`

const StyledAddBtn = styled(StyledBtn)`
  display: block;
  width: 200px;
  height: 30px;
  margin: 30px auto 30px;
  background-color: lightblue;
`

const Matrix = ({M, N, X, matrix, initialAddMatrix, addRow, deleteRow, className}) => {
  const [warnings, setWarnings] = useState([]);
  const [nearest, setNearest] = useState([]);
  const [percentagesRow, setPercentagesRow] = useState({});

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

  const onSumCellHover = (e, rowIndex) => {
    const sum = Number(e.target.innerText);
    const rowValues =  matrix[rowIndex];
    setPercentagesRow({
      [rowIndex]: rowValues.map(data => Math.trunc((data / sum) * 100))
    });
  }

  return (
    <div>
      {warnings.length > 0 && <div className='warnings'>{warnings.map(warning => <div className='warnings__item'>{warning}</div>)}</div>}
      <StyledAddBtn onClick={() => addRow(generateMatrixRow(N))}>Add new row</StyledAddBtn>
      <div className={className}>
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
                  onMouseOut={() => setNearest([])}
                  highlighted={nearest.includes(value)} />
              ))
            }
            <Cell
              key={rowIndex}
              value={matrix[rowIndex].reduce((el, acc) => el + acc, 0)}
              onMouseOver={(e) => onSumCellHover(e, rowIndex)}
              onMouseOut={() => setPercentagesRow({})} />
            <StyledDeleteBtn onClick={() => deleteRow(rowIndex)}>Delete Row</StyledDeleteBtn>
          </div>
        ))}
        <div key={'column-sums'} className="matrix__row">
          {new Array(N)
            .fill(0)
            .map((el, index) => {
              const average = Math.trunc(Object.values(matrix).map((el) => el[index]).reduce((el, acc) => el + acc, 0) / M)
              return <Cell key={`column-sum-${index}`} value={average} />
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  matrix: matrixSelector(state),
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