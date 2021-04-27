export class LocalStorageService {
  // we could use  this method in componentDidUpdate()
  static setReadList(readList) {
    localStorage.setItem("readList", JSON.stringify(readList));
  }
  // we could use  this method in componentDidUpdate()
  static setFinishedList(finishedList) {
    localStorage.setItem("finishedList", JSON.stringify(finishedList));
  }

  static get readList() {
    const jsonReadList = localStorage.getItem("readList");
    return jsonReadList ? JSON.parse(jsonReadList) : [];
  }

  static get finishedList() {
    const jsonFinishedList = localStorage.getItem("finishedList");
    return jsonFinishedList ? JSON.parse(jsonFinishedList) : [];
  }

  static addBookToReadList(book) {
    // yeah some double check
    const oldList = LocalStorageService.readList;
    const isListed = oldList.some((item) => item._id === book._id);
    if (isListed) {
      return;
    }
    LocalStorageService.setReadList([...oldList, book]);
  }

  static deleteBook(book) {
    // yeah some double check
    const oldList = LocalStorageService.readList;
    const newReadList = oldList.filter((item) => item._id !== book._id);
    LocalStorageService.setReadList(newReadList);
  }

  static addBookToFinishedList(book) {
    const oldFinishedList = LocalStorageService.finishedList;
    const isListed = oldFinishedList.some((item) => item._id === book._id);
    if (isListed) {
      return;
    }

    LocalStorageService.setFinishedList([...oldFinishedList, book]);
  }
}
