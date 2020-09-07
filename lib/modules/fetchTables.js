"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchTables = fetchTables;

var _defaults = require("./defaults.js");

function fetchTables(guideIDs) {
  if (guideIDs.isArray) {
    guideIDs.forEach(function (guideID) {
      var fetchedJSON, bodyOfGuide, htmlContainer, table;
      var requestURL = "https://telia-dk.humany.net/".concat(_defaults.DEFAULTS.humanyInterfaceName, "/guides/").concat(guideID, "?language=da&credentials=true");
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Parse response to JSON
          fetchedJSON = JSON.parse(request.responseText); // Get the guide BODY from the JSON

          bodyOfGuide = fetchedJSON.Body; // Create placeholder html element with the body

          htmlContainer = document.createElement("DIV");
          htmlContainer.innerHTML = bodyOfGuide; // Get the table only

          table = htmlContainer.querySelector(".".concat(_defaults.DEFAULTS.notificationTableClass));
          return table;
        }
      };

      request.open("GET", requestURL, false);
      request.send();
    });
  } else {
    console.error("fetchTables responded with an error: Parameter is not present or is not of type: 'array'");
  }
}