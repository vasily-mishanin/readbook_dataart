import React from "react";
import { shortenString } from "./../helpers/stringUtilites";

const FinishedBookCard = ({ book }) => {
  let { title, subtitle, language, author_name } = book;

  const processLangArr = (langArr) => (langArr ? `(${langArr.join(", ")})` : ``);

  const MAX_TITLE_LENGTH = 30;
  const MAX_SUBTITLE_LENGTH = 30;
  const MAX_LANG_LENGTH = 22;
  title = shortenString(title, MAX_TITLE_LENGTH);
  subtitle = shortenString(subtitle, MAX_SUBTITLE_LENGTH);
  language = shortenString(processLangArr(language), MAX_LANG_LENGTH);

  return (
    <article className="readinglist__finished-book-card">
      <h3>
        {title} <span>{language}</span>
      </h3>
      <h4 className="muted">{subtitle}</h4>
      <h2>{author_name}</h2>
    </article>
  );
};

export default FinishedBookCard;
