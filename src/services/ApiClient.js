export class ApiClient {
  //FETCH
  #apiURL;

  constructor(endpointURL) {
    this.#apiURL = endpointURL;
  }

  async get(resource) {
    const url = `${this.#apiURL}${resource}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const resultJSON = await response.json();
        return resultJSON;
      }
      console.log(`Request to ${url} finished with ${response.status}`);
    } catch (error) {
      console.error(`Request to ${url} failed with error:`, error);
    } finally {
      console.log(`Request to ${url} is done`);
    }
  }
}

// async search(query, pageNumber = 1) {
//   const url = `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}`;
//   const result = await fetch(url);
//   return await result.json();
// }
