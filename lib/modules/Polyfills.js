"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polys = void 0;

// Polyfills
var polys = function () {
  // TODO: move this inside the seperate script for polyfills
  // ---- DECLARE REMOVE-METHOD IN PROTOTYPE FOR IE ----
  if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  } // TODO: move this inside the seperate script for polyfills
  // ---- .includes() POLYFILL for Internet Explorer and Opera ----


  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      "use strict";

      if (search instanceof RegExp) {
        throw TypeError("first argument must not be a RegExp");
      }

      if (start === undefined) {
        start = 0;
      }

      return this.indexOf(search, start) !== -1;
    };
  }
}();

exports.polys = polys;