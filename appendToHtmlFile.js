const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
// Refactor to ask for these next two paths
const directoryPath = "/Users/juancubeddu/work/jones-company/webflow/";
const mapFile = require("/Users/juancubeddu/work/jones-company/map-file/index.js");

appendDataRolesToHTML(directoryPath, mapFile);

function appendDataRolesToHTML (dirPath, mapFile) {
  // readDirectoryAndGetFiles(dirPath, mapFile);
  allHtmlFiles(dirPath,'.html', mapFile);
}

function readDirectoryAndGetFiles(dirPath, mapFile) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(err);
    }

    // filterHTMLFiles(files, dirPath, mapFile);
    // allHtmlFiles(dirPath,'.html', mapFile);
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
function allHtmlFiles(dirPath, filter, mapFile){
    // console.log('Starting from dir '+dirPath+'/');
    if (!fs.existsSync(dirPath)){
        console.log("no dir ",dirPath);
        return;
    }

    var files=fs.readdirSync(dirPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(dirPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            allHtmlFiles(filename,filter, mapFile); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
           fs.readFile(filename, "utf-8", (err, contents) => {
        if (err) {
          console.log(err);
        }

        parseFileAndAddData(contents, mapFile);
      });
        };
    };
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
  // TODO: Decide whether or not to ask for directoryPath or have users hardcode
  const stream = fs.createWriteStream(`${directoryPath}${page.filename}.html`);

  stream.once('open', function(fd) {
    var html = $.html();

    stream.end(html);
  });
}

