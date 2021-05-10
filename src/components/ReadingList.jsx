import React from "react";
import BookListHeader from "./BookListHeader";
import ToReadBookCard from "./ToReadBookCard";
import FinishedBookCard from "./FinishedBookCard";

const ToReadList = ({ toReadList, finishedBooksList, onMarkAsRead, onRemove }) => {
  const totalBooks = toReadList.length + finishedBooksList.length;
  const readBooks = finishedBooksList.length;
  return (
    <section className="readinglist">
      <BookListHeader>
        {" "}
        <h1 className="readinglist__title">To Read List...</h1>
        <p className="readinglist__info">
          <span>{totalBooks}</span> books, {readBooks} read
        </p>
      </BookListHeader>
      <div className="readinglist__content">
        {toReadList.map((book) => (
          <ToReadBookCard
            key={book._id}
            book={book}
            finishedBooksList={finishedBooksList}
            onMarkAsRead={onMarkAsRead}
            onRemove={onRemove}
          />
        ))}

        {finishedBooksList.map((book) => (
          <FinishedBookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default ToReadList;

//author_name
