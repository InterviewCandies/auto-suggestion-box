import { Suggestion, Collection, Product } from "./model.js";
const suggestionList = document
  .querySelector(".suggestions")
  .querySelector(".list");
const collectionList = document
  .querySelector(".collections")
  .querySelector(".list");
const productList = document.querySelector(".products").querySelector(".list");

class Factory {
  static createBlock(type) {
    switch (type) {
      case "Suggestions":
        return [
          "http://www.json-generator.com/api/json/get/bZCGtZOqDC?indent=2",
          Suggestion,
          suggestionList,
        ];
      case "Collections":
        return [
          "http://www.json-generator.com/api/json/get/bTwjXsUGGa?indent=2",
          Collection,
          collectionList,
        ];
      case "Products":
        return [
          "http://www.json-generator.com/api/json/get/bULaCnUWGa?indent=2",
          Product,
          productList,
        ];
      default:
        return [];
    }
  }
}
export default Factory;
