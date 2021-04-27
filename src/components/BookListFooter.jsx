import React from "react";
import BookListInfo from "./BooklistInfo";

const BooklistFooter = (props) => {
  const { listInfo, onNextClick, onPrevClick } = props;
  return (
    <footer className="booklist__footer">
      {listInfo.booksFound && <BookListInfo listInfo={listInfo} onNextClick={onNextClick} onPrevClick={onPrevClick} />}
    </footer>
  );
};

export default BooklistFooter;
