// TODO: decide how to limit mapFile and directoryPath scope. Should they be
// passed down through each function in case we separate this file?

require('dotenv').config();

const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const directoryPath = process.env.DIRECTORY_PATH;
const mapFilePath = process.env.MAP_FILE_PATH;
const mapFile = require(mapFilePath);

appendDataRolesToHTML(directoryPath, mapFile);

function appendDataRolesToHTML(dirPath, mapFile) {
  if (!fs.existsSync(dirPath)){
    return console.log("Could not find directory at ", dirPath);
  }

  const HTMLFiles = [];

  getHTMLFiles(HTMLFiles, dirPath);

  parseHTMLFiles(HTMLFiles, mapFile);
}

function getHTMLFiles(HTMLFiles, dirPath) {
  const files = readDirectoryAndGetFiles(dirPath);

  files.forEach(file => {
    const fileName = path.join(dirPath, file);

    if (file.substr(-5) === ".html") {
      HTMLFiles.push(fileName);
    } else {
      const stat = fs.lstatSync(fileName);

      if (stat.isDirectory()){
        getHTMLFiles(HTMLFiles, fileName);
      }
    }
  });
};

function readDirectoryAndGetFiles(dirPath) {
  return fs.readdirSync(dirPath);
}

function parseHTMLFiles(HTMLFiles, mapFile) {
  HTMLFiles.forEach(file => readAndParseFile(file, mapFile));
};

function readAndParseFile(file, mapFile){
  fs.readFile(file, "utf-8", (err, contents) => {
    if (err) {
      console.log(err);
    }

    parseFileAndAddData(contents, mapFile);
  });
};

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
  const stream = fs.createWriteStream(`${directoryPath}${page.filename}.html`);

  stream.once('open', function(fd) {
    var html = $.html();

    stream.end(html);
  });
}

