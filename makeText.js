/** Command-line tool to generate Markov text. */

const fs = require("fs");
const http = require("http");
const https = require("https");
const process = require("process");
const { MarkovMachine } = require("./markov");

/** Make markov text from text and print to console. */
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

/** Read file and generate markov text from it. */
function makeTextFromFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Cannot read file '${path}': ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

/** Read URL and make markov text from it. */
function makeTextFromURL(url) {
  const client = url.startsWith('https:') ? https : http;
  
  client.get(url, function (resp) {
    let data = "";

    resp.on("data", function (chunk) {
      data += chunk;
    });

    resp.on("end", function () {
      generateText(data);
    });

  }).on("error", function (err) {
    console.error(`Cannot read URL '${url}': ${err.message}`);
    process.exit(1);
  });
}

// Get command line arguments
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeTextFromFile(path);
} else if (method === "url") {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  console.error("Usage: node makeText.js file <path>");
  console.error("       node makeText.js url <url>");
  process.exit(1);
}
