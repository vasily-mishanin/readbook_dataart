import React, { useCallback, useState } from "react";

const SearchBox = (props) => {
  const { onSearch, onChange, onEnter } = props;
  const [inputValue, setInputValue] = useState(null);

  const handleInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className="searchbox">
      <input
        className="searchbox__input"
        type="text"
        name="searchInput"
        autoComplete="on"
        placeholder="Author or title ..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
        onInput={handleInput}
      />
      <button className="searchbox__button" onClick={() => onSearch()} disabled={!inputValue}>
        Go!
      </button>
    </div>
  );
};

export default SearchBox;
