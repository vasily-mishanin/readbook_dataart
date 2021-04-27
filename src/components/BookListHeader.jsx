import React from "react";

const BookListHeader = (props) => {
  //const { onSearch, onChange, onEnter, children } = props;
  return <div className="booklist__header">{props.children}</div>;
};

export default BookListHeader;
