import React from 'react';

const TableRow = ({children,onClick}) => {
  return (
    <tr className="common-table-row" onClick={onClick}>{children}</tr>
  )
}

export default TableRow;