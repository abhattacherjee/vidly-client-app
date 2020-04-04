import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => {
          return (
            <tr key={item._id || item.key}>
              {columns.map(column => {
                return (
                  <td key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  createKey = (item, column) => item._id + (column.path || column.key);

  renderCell = (item, column) =>
    column.content ? column.content(item) : _.get(item, column.path);
}

export default TableBody;
