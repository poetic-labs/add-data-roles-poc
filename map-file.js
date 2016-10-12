module.exports = {
  news_article: {
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
  },
  home: {
    filename: "home",
    title: "Noventis V5",
    attributes: [
      {
        selector: ".header",
        data: {
          "data-block": "home_header",
          "data-unique": "test 2",
        },
      },
      {
        selector: ".mobile-menu",
        data: {
          "data-menu": "mainmenu",
        }
      },
      {
        selector: ".overlay .main-container h1",
        data: {
          "data-block-field": "title",
          "data-type": "string",
          "data-form-type": "string_textfield",
          "data-format-type": "string",
        }
      },
      {
        selector: ".overlay .main-container .subtext",
        data: {
          "data-block-field": "body",
          "data-type": "text_long",
          "data-form-type": "text_textarea",
          "data-format-type": "text_default",
        }
      },
      {
        selector: ".bg-image",
        data: {
          "data-block": "about",
        }
      },
      {
        selector: ".text-white",
        data: {
          "data-type": "form",
          "data-form-type": "test",
          "data-format-type": "test",
        }
      },
    ],
  }
};
