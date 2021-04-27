import React from "react";
import BookListHeader from "./BookListHeader";
import SearchBox from "./SearchBox";
import BooklistContent from "./BookListContent";
import BookListFooter from "./BookListFooter";

const BookList = (props) => {
  const {
    booksList,
    isLoading,
    listInfo,
    onChange,
    onEnter,
    onSearch,
    onScroll,
    onNextClick,
    onPrevClick,
    onBookCardClick,
  } = props;
  return (
    <React.Fragment>
      <section className="booklist">
        <BookListHeader>
          <SearchBox onChange={onChange} onEnter={onEnter} onSearch={onSearch} />
        </BookListHeader>
        <BooklistContent content={booksList} isLoading={isLoading} onScroll={onScroll} onBookCardClick={onBookCardClick} />
        <BookListFooter listInfo={listInfo} onNextClick={onNextClick} onPrevClick={onPrevClick} />
      </section>
    </React.Fragment>
  );
};

export default BookList;
