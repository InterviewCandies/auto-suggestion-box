export class Suggestion {
  constructor(term, url) {
    this.term = term;
    this.url = url;
  }

  static filter(suggestions, userData) {
    return suggestions
      .filter((data) => {
        return data.Term.toLocaleLowerCase().includes(
          userData.toLocaleLowerCase()
        );
      })
      .map((data) => {
        let pos = data.Term.toLocaleLowerCase().indexOf(
          userData.toLocaleLowerCase()
        );
        return (
          data.Term.substr(0, pos) +
          "<strong>" +
          data.Term.substr(pos, userData.length) +
          "</strong>" +
          data.Term.substr(pos + userData.length, data.length)
        );
      });
  }

  static display(items) {
    return items.map((data) => {
      return (data = "<li>" + data + "</li>");
    });
  }
}

export class Collection extends Suggestion {
  constructor(id, title, url) {
    super(url);
    this.id = id;
    this.url = url;
    this.title = title;
  }

  static filter(suggestions, userData) {
    return suggestions
      .filter((data) => {
        return data.Title.toLocaleLowerCase().includes(
          userData.toLocaleLowerCase()
        );
      })
      .map((data) => data.Title);
  }
}

export class Product extends Collection {
  constructor(id, title, url, brand, price, image) {
    super(id, title, url);
    this.brand = brand;
    this.price = price;
    this.image = image;
  }

  static filter(suggestions, userData) {
    return suggestions.filter((data) => {
      return data.Title.toLocaleLowerCase().includes(
        userData.toLocaleLowerCase()
      );
    });
  }

  static display(items) {
    return items.map((data) => {
      return (
        '<li class="product">' +
        '<img src="' +
        data.Image +
        '" class="image" />' +
        "<div>" +
        '<p class="title">' +
        data.Title +
        "</p>" +
        '<p class="brand">' +
        data.Brand +
        "</p>" +
        '<p class="price">' +
        data.Price +
        "</p>" +
        "</div>" +
        "</li>"
      );
    });
  }
}
