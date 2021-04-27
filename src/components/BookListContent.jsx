import React from "react";
import BookCard from "./BookCard";
import LoaderFade from "./LoaderFade";

const BooklistContent = (props) => {
  const { content, isLoading, onScroll, onBookCardClick } = props;

  return (
    <div className="booklist__content" onScroll={(e) => onScroll(e)}>
      {isLoading && <LoaderFade />}
      {content.map((item) => (
        <BookCard key={item._id} book={item} onBookCardClick={onBookCardClick} />
      ))}
    </div>
  );
};

export default BooklistContent;
