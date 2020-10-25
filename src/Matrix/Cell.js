import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({value, rowIndex, cellIndex}) => {
  const cellAttributes = {
    className: "matrix__cell"
  }

  if (rowIndex && cellIndex) {
    cellAttributes['data-cell'] = `${rowIndex}-${cellIndex}`
  }

  return <div {...cellAttributes}>{value}</div>
}

Cell.protoTypes = {
  value: PropTypes.number,
  rowIndex: PropTypes.number,
  cellIndex: PropTypes.number
}

export default Cell;