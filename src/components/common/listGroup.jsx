import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onItemSelect,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        let classes = "clickable list-group-item";
        if (selectedItem === item) classes += " active";

        return (
          <li
            key={item[valueProperty]}
            className={classes}
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
