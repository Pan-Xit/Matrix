import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import {updateMatrixCellAction} from '../actions';

const Cell = ({value, rowIndex, cellIndex, updateCell}) => {
  const cellAttributes = {
    className: "matrix__cell",
  }

  if (rowIndex !== undefined && cellIndex !== undefined) {
    cellAttributes['data-cell'] = `${rowIndex}-${cellIndex}`;
    cellAttributes['onClick'] = () => updateCell(rowIndex, cellIndex, 1);
  }

  return <div {...cellAttributes}>{value}</div>
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