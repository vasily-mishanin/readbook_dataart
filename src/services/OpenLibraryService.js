import { ApiClient } from "./ApiClient";

const OPEN_LIBRARY_endpoint = `https://openlibrary.org/search.json?q=`;

export class OpenLibraryService {
  static #ApiClient = new ApiClient(OPEN_LIBRARY_endpoint);

  static async getBooks(searchQuery, pageNumber) {
    const fullSearchQuery = `${searchQuery}&page=${pageNumber}`;
    const booksData = await OpenLibraryService.#ApiClient.get(fullSearchQuery);
    //console.log({ fullSearchQuery, booksData });
    return booksData;
  }
}

// async search(query, pageNumber = 1) {
//   const url = `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}`;
//   const result = await fetch(url);
//   return await result.json();
// }
