import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {updateMatrixCellAction} from '../actions';


const Cell = ({value, rowIndex, cellIndex, highlighted, withBackground, updateCell, onMouseOver, onMouseOut}) => {
  const cellClass = highlighted ? "matrix__cell highlighted" :
    withBackground ? "matrix__cell with-background" : "matrix__cell";

  const cellAttributes = {
    className: cellClass,
  }

  if (rowIndex !== undefined && cellIndex !== undefined) {
    cellAttributes['data-cell'] = `${rowIndex}-${cellIndex}`;
    cellAttributes['onClick'] = () => updateCell(rowIndex, cellIndex, 1);
  }

  if (onMouseOver) {
    cellAttributes['onMouseOver'] = onMouseOver;
  }

  if (onMouseOut) {
    cellAttributes['onMouseOut'] = onMouseOut;
  }

  return (
    <div {...cellAttributes}>
      {withBackground && <span className='matrix__cell-deco' style={{width: `${value}%`}}></span>}
      {value}
    </div>)
}

const mapDispatchToProps = {
  updateCell: (rowIndex, colIndex, value) => updateMatrixCellAction(rowIndex, colIndex, value)
}

Cell.protoTypes = {
  value: PropTypes.number,
  rowIndex: PropTypes.number,
  cellIndex: PropTypes.number,
  updateCell: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Cell);