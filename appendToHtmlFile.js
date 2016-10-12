const fs = require("fs");
const cheerio = require("cheerio");
const directoryPath = "/Users/bee/Downloads/noventispayments-v5.webflow/"
const data = require("./data-constants.js");

const mapFile = {
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

appendDataRolesToHTML(directoryPath, mapFile);

function appendDataRolesToHTML (dirPath, mapFile) {
  readDirectoryAndGetFiles(dirPath, mapFile);
}

function readDirectoryAndGetFiles(dirPath, mapFile) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err);
    }

    filterHTMLFiles(files, dirPath, mapFile);
  });
}

function filterHTMLFiles(files, dirPath, mapFile) {
  files
    .filter(file => file.substr(-5) === ".html")
    .forEach(file => {
      fs.readFile(`${dirPath}${file}`, "utf-8", (err, contents) => {
        if (err) {
          console.log(err);
        }

        parseFileAndAddData(contents, mapFile);
      });
    });
}

function parseFileAndAddData(contents, mapFile) {
  const $ = cheerio.load(contents);

  filterByMapFileAndAddData(mapFile, $);
}

function filterByMapFileAndAddData(mapFile, $) {
  Object.keys(mapFile).forEach(key => {
    const page = mapFile[key];

    if ($("title").text() === page.title) {
      addData($, page);
    }
  });
}

function addData($, page) {
  page.attributes.forEach(attribute => {
    const targetElement = $(attribute.selector);

    if (Array.isArray(targetElement)) {
      targetElement.forEach(element => {
        element.attr(attribute.data);
      });
    } else {
      targetElement.attr(attribute.data);
    }
  });

  writeUpdatedHTML($, page);
}

function writeUpdatedHTML($, page) {
  // TODO: Decide whether or not to ask for directoryPath or have users hardcode
  const stream = fs.createWriteStream(`${directoryPath}${page.filename}.html`);

  stream.once('open', function(fd) {
    var html = $.html();

    stream.end(html);
  });
}


