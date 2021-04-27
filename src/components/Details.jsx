import React from "react";

const Details = ({ bookDetails, onAddBookClick }) => {
  let { title, subtitle, language, has_fulltext, first_publish_year, publish_year } = bookDetails;
  //local helpers
  const processLangArr = (langArr) => (langArr ? `(${langArr.join(", ")})` : ``);
  const processYearArr = (yearArr) => {
    return yearArr && Array.isArray(yearArr) ? `${yearArr.join(", ")}` : yearArr === 0 ? `unknown` : yearArr;
  };

  publish_year = processYearArr(publish_year);
  first_publish_year = processYearArr(first_publish_year);
  language = processLangArr(language);
  //in case we have {} book
  const isBookExist = Object.keys(bookDetails).length > 0;
  return (
    <article className="details">
      <h2 className="details__heading">Book details</h2>
      {isBookExist && (
        <div>
          <h1 className="details__title">{title}</h1>
          <h2 className="details__title muted">{subtitle}</h2>
          <p>
            Languages avalable: <span>{language || `no information`}</span>{" "}
          </p>
          <p>
            Full text available:{" "}
            {has_fulltext ? <span style={{ color: "#ffd933" }}>yes</span> : <span style={{ color: "#c72c41" }}> not </span>}{" "}
          </p>
          <p>
            First publish year: <span>{first_publish_year || `no information`}</span>{" "}
          </p>
          <p>
            Years published: <span>{publish_year || `no information`}</span>{" "}
          </p>
          <button onClick={() => onAddBookClick(bookDetails)}>Add book to Read List</button>
        </div>
      )}
    </article>
  );
};

export default Details;
