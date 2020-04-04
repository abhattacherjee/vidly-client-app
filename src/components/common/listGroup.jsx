import React from "react";

const ListGroup = props => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty,
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => {
        let classes = "list-group-item";
        if (selectedItem === item) classes += " active";

        return (
          <li
            key={item[valueProperty]}
            className={classes}
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}>
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = { textProperty: "name", valueProperty: "_id" };

export default ListGroup;
