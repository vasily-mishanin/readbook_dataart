import React from "react";
import { shortenString } from "./../helpers/stringUtilites";

const ToReadBookCard = ({ book, finishedBooksList, onMarkAsRead, onRemove }) => {
  let { title, subtitle, language, author_name } = book;
  const processLangArr = (langArr) => (langArr ? `(${langArr.join(", ")})` : ``);

  const MAX_TITLE_LENGTH = 30;
  const MAX_SUBTITLE_LENGTH = 30;
  const MAX_LANG_LENGTH = 22;
  title = shortenString(title, MAX_TITLE_LENGTH);
  subtitle = shortenString(subtitle, MAX_SUBTITLE_LENGTH);
  language = shortenString(processLangArr(language), MAX_LANG_LENGTH);
  const isMarked = finishedBooksList.some((item) => item._id === book._id);

  return (
    <article className="readinglist__to-read-book-card">
      <h3>
        {title} <span>{language}</span>
      </h3>
      <h4 className="muted">{subtitle}</h4>
      <h2>{author_name}</h2>
      <button name="btn_markAsRead" onClick={() => onMarkAsRead(book)}>
        Mark as read
      </button>
      <button name="btn_remove" onClick={() => onRemove(book)}>
        Remove from list
      </button>
      {isMarked && <p className="readinglist__to-read-book-card--message">(Marked)</p>}
    </article>
  );
};

export default ToReadBookCard;
