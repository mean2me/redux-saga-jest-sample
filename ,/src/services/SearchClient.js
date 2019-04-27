class SearchClient {
  static async search(params) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { result: {itineraries: [{value:"success"}], query: {}, summary: {} }};
  }
}

export default SearchClient;
