const fs = require("fs");
const cheerio = require("cheerio");
const directoryPath = "/Users/bee/Downloads/noventispayments-v5.webflow/"
const mapFile = {
  // page1: {
    // title: "News-Article",
    // attributes: [
      // {
        // selector: "header",
        // data: [
          // { block: "home_header" },
          // { unique: "unique" },
        // ],
      // }
    // ],
  // },
  home: {
    title: "Noventis V5",
    attributes: [
      {
        selector: "header",
        data: [
          { block: "home_header" },
          { unique: "unique" },
        ],
      }
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

    filterFilesAndGetHTMLFiles(files, dirPath, mapFile);
  });
}

function filterFilesAndGetHTMLFiles(files, dirPath, mapFile) {
  files
    .filter(file => file.substr(-5) === ".html")
    .forEach(file => {
      fs.readFile(`${dirPath}${file}`, "utf-8", (err, contents) => {
        if (err) {
          console.log(err);
        }

        return parseFileAndAddData(contents, mapFile);
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
  console.log(page);
  page.attributes.forEach(attribute => {
    $(`.${attribute.selector}`).data(...attribute.data);
    console.log($(`.${attribute.selector}`).data());
  });

  // $('<div data-apple-color="red"></div>').data('apple-color')
  // //=> 'red'

  // var apple = $('.apple').data('kind', 'mac')
  // apple.data('kind')
  // //=> 'mac'
}

