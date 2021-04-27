import React from "react";
import { shortenString } from "./../helpers/stringUtilites";

const BookCard = (props) => {
  const { book, onBookCardClick } = props;
  let { title, subtitle, language, isSelected } = book;

  const processLangArr = (langArr) => (langArr ? `(${langArr.join(", ")})` : ``);

  const MAX_TITLE_LENGTH = 30;
  const MAX_SUBTITLE_LENGTH = 30;
  const MAX_LANG_LENGTH = 22;
  title = shortenString(title, MAX_TITLE_LENGTH);
  subtitle = shortenString(subtitle, MAX_SUBTITLE_LENGTH);
  language = shortenString(processLangArr(language), MAX_LANG_LENGTH);

  return (
    <article className={`booklist__card ${isSelected ? "checked" : ""}`} onClick={() => onBookCardClick(book)}>
      {" "}
      <h3>
        {" "}
        {title} <span>{language}</span>{" "}
      </h3>{" "}
      <h4 className="muted">{subtitle}</h4>{" "}
    </article>
  );
};

export default BookCard;
