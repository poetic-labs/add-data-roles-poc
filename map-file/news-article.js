const data = require("../data-constants.js");

module.exports = {
  filename: "news-article",
  title: "News-Article",
  attributes: [
    {
      selector: ".header",
      data: {
        "data-block": "news_article_header",
        "data-unique": "test",
      },
    },
    {
      selector: ".post-selection",
      data: {
        "data-test": "test",
      }
    },
  ],
}
