import React from "react";

const BookListInfo = (props) => {
  const { listInfo, onNextClick, onPrevClick } = props;

  return (
    <React.Fragment>
      <div className="booklist__footer-info">
        <p>
          Found: <span>{listInfo.booksFound}</span>{" "}
        </p>
        <p>
          Start: <span>{listInfo.start}</span>{" "}
        </p>
        <p>
          Page size: <span>{listInfo.pageSize}</span>{" "}
        </p>
      </div>

      <div className="booklist__footer-controls">
        {" "}
        <button name="previous" onClick={() => onPrevClick()}>
          Prev. results
        </button>
        <button name="next" onClick={() => onNextClick()}>
          Next. results
        </button>
      </div>
    </React.Fragment>
  );
  // add conditional rendering
};

export default BookListInfo;
