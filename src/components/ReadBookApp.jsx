import React, { Component } from "react";
import BookList from "./BookList";
import Details from "./Details";
import ReadingList from "./ReadingList";
import { OpenLibraryService } from "./../services/OpenLibraryService";
import { LocalStorageService } from "../services/LocalStorageService";

const BOOKS_on_PAGE = 100;

class ReadBookApp extends Component {
  //STATE
  state = {
    searchQuery: "",
    booksList: [],
    isLoading: false,
    prevLists: [],
    currentPage: 1,
    listInfo: {
      booksFound: null,
      start: null,
      pageSize: 100,
    },
    selectedBook: {},
  };

  //lifecycle

  constructor(props) {
    super(props);
    this.lastQuery = this.state.searchQuery;
    this.state.toReadList = LocalStorageService.readList;
    this.state.finishedBooksList = LocalStorageService.finishedList;
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage, prevLists } = this.state;
    // if page has been changed
    if (currentPage !== prevState.currentPage) {
      const prevList = prevLists.find((item) => item.page === currentPage);
      if (prevList) {
        const newList = prevList.list;
        const { booksFound, start, pageSize } = prevList.listInfo;
        this.setState({ booksList: newList, listInfo: { booksFound, start, pageSize } });
      } else if (currentPage > prevState.currentPage) {
        this.handleSearch();
      }
    }

    //if search query has been changed
    if (searchQuery !== prevState.searchQuery) {
      this.debouncedSearch();
    }
    //LocalStorageService.setReadList(toReadList);
    //LocalStorageService.setFinishedList(finishedBooksList);
  }

  //debounce
  debounce(callback, wait) {
    let timeout_ID = null;
    return (...args) => {
      //console.log("DEBOUNCE...");
      window.clearTimeout(timeout_ID);
      timeout_ID = window.setTimeout(() => {
        // timeout_ID = null;
        callback.apply(null, args);
      }, wait);
    };
  }

  WAIT_TIMEOUT_ms = 2000;
  debouncedSearch = this.debounce(() => this.handleSearch(), this.WAIT_TIMEOUT_ms);

  //handlers
  // SEARCH ON -> press "Enter", click "!Go", change search query in <input>
  handleSearch = async () => {
    let { searchQuery, currentPage, prevLists } = this.state;
    console.log("Search:", searchQuery, currentPage);
    // if search on new query => reset downloaded lists
    if (searchQuery !== this.lastQuery) {
      currentPage = 1;
      prevLists = [];
    }
    let newList = [];
    // loading -> true
    this.setState({ isLoading: true });
    // console.log("isLoading: true ");
    const booksData = await OpenLibraryService.getBooks(searchQuery, currentPage);
    const { docs, numFound, start } = booksData;
    // loading -> false
    this.setState({ isLoading: false });
    //console.log("isLoading: false ");
    newList = [...docs];
    //addin id for each book
    newList.forEach((item) => (item._id = item.key.split("/").pop()));
    const size = docs.length;
    const newListInfo = { booksFound: numFound, start: start, pageSize: size };
    this.lastQuery = searchQuery; // need for handling debounced search
    // update current list and downloaded lists
    this.setState({
      booksList: newList,
      currentPage,
      listInfo: newListInfo,
      prevLists: [...prevLists, { page: currentPage, list: newList, listInfo: newListInfo }],
    });
    console.log("State.booksList:", this.state.booksList);
  };

  handleInputChange = (value) => {
    const newQuery = value;
    this.setState({ searchQuery: newQuery });
  };

  handleEnter = (e) => {
    const isEnterPressed = () => e.key === "Enter";
    if (isEnterPressed()) {
      this.handleSearch();
    }
    return;
  };

  handleNextClick = () => {
    if (this.isAnyMoreBooks()) {
      const nextPageNum = this.state.currentPage + 1;
      this.setState({ currentPage: nextPageNum });
    }
  };

  handlePrevClick = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      this.setState({ currentPage: prevPage });
    }
  };

  handleScroll = (e) => {
    if (this.isAnyMoreBooks()) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      // console.log("Scrolling...");
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        //console.log("Scrolling...Bottom ", e.target.scrollTop);
        const nextPageNum = this.state.currentPage + 1;
        e.target.scrollTop = 5;
        this.setState({ currentPage: nextPageNum });
      }
    }
  };

  handleBookCardClick = (book) => {
    const { booksList } = this.state;
    const previouslySelectedBook = booksList.find((item) => item.isSelected === true);
    // in case we select the same Book Card
    if (previouslySelectedBook && previouslySelectedBook._id === book._id) {
      return;
    }
    // else -> reselect previouslySelectedBook
    if (previouslySelectedBook) {
      const prevSelectedBookIndex = booksList.indexOf(previouslySelectedBook);
      booksList[prevSelectedBookIndex].isSelected = false;
    }

    const selectedBookIndex = booksList.indexOf(book);
    booksList[selectedBookIndex].isSelected = true;
    this.setState({ booksList, selectedBook: book });
  };

  handleAddBookClick = (book) => {
    const { toReadList } = this.state;
    //check if book has been already added
    const isListed = toReadList.some((item) => item._id === book._id);
    if (isListed) {
      return;
    }
    LocalStorageService.addBookToReadList(book);
    this.setState({ toReadList: [...toReadList, book] });
  };

  handleMarkAsRead = (book) => {
    const { finishedBooksList } = this.state;
    const isListed = finishedBooksList.some((item) => item._id === book._id);
    if (isListed) {
      // and do some UI Animation..
      return;
    }
    LocalStorageService.addBookToFinishedList(book);
    this.setState({ finishedBooksList: [...finishedBooksList, book] });
  };

  handleRemove = (book) => {
    const { toReadList } = this.state;
    const newToReadList = toReadList.filter((item) => item._id !== book._id);
    LocalStorageService.deleteBook(book);
    this.setState({ toReadList: newToReadList });
  };

  //check if any books left
  isAnyMoreBooks = () => {
    const { currentPage } = this.state;
    const { pageSize, booksFound } = this.state.listInfo;
    if (pageSize === BOOKS_on_PAGE && booksFound > currentPage * BOOKS_on_PAGE) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { booksList, isLoading, listInfo, selectedBook, toReadList, finishedBooksList } = this.state;
    const {
      handleInputChange,
      handleEnter,
      handleSearch,
      handleNextClick,
      handlePrevClick,
      handleScroll,
      handleBookCardClick,
      handleAddBookClick,
      handleMarkAsRead,
      handleRemove,
    } = this;

    return (
      <main className="booklist-app">
        <BookList
          booksList={booksList}
          isLoading={isLoading}
          listInfo={listInfo}
          onChange={handleInputChange}
          onEnter={handleEnter}
          onSearch={handleSearch}
          onNextClick={handleNextClick}
          onPrevClick={handlePrevClick}
          onScroll={handleScroll}
          onBookCardClick={handleBookCardClick}
        />
        <Details bookDetails={selectedBook} toReadList={toReadList} onAddBookClick={handleAddBookClick} />
        <ReadingList
          toReadList={toReadList}
          finishedBooksList={finishedBooksList}
          onMarkAsRead={handleMarkAsRead}
          onRemove={handleRemove}
        />
      </main>
    );
  }
}

export default ReadBookApp;
