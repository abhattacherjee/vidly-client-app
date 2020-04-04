import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { length, pageSize, currentPage, onPageChange } = this.props;
    const totalPages = Math.ceil(length / pageSize);
    const pages = _.range(1, totalPages + 1);
    if (totalPages === 1) return null;

    return (
      <nav>
        <ul className="pagination">
          {pages.map(p => {
            return (
              <li className="page-item" key={p}>
                <button
                  className={this.getPageButtonClasses(p, currentPage)}
                  onClick={() => onPageChange(p)}>
                  {p}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  getPageButtonClasses = (page, currentPage) => {
    let classes = "btn btn-sm m-1 ";
    if (page === currentPage) classes += "btn-primary";
    else classes += "btn-light";

    return classes;
  };
}

Pagination.propTypes = {
  length: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
