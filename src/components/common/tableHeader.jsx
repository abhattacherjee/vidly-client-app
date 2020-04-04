import React, { Component } from "react";

class TableHeader extends Component {
  // columns: array
  // sortColumn: object
  // onSort: fn

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th
                key={column.path || column.key}
                className={"clickable"}
                onClick={() => this.raiseSort(column.path)}>
                {column.label} {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== this.props.sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
}

export default TableHeader;
