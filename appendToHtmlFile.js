const fs = require("fs");
const cheerio = require("cheerio");
const directoryPath = "/Users/bee/Downloads/noventispayments-v5.webflow/"
const mapFile = require("./map-file/index.js");

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

