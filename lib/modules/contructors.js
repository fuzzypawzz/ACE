"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = Template;
exports.createSvg = createSvg;

/**
 * CREATES HTML ELEMENTS BASED ON THE PARAMETERS OBJECT
 * @constructor
 * @param {Object} params Property object for the HTML element: tag, class, id, imageSrc, innerHTML
 */
function Template(params) {
  this.elementTag = params.tag;
  this.elementClass = params["class"];
  this.elementId = params.id;
  this.imageSrc = params.imageSrc;
  this.innerHTML = params.innerHTML;

  this.create = function () {
    var htmlElement;

    if (this.elementTag) {
      htmlElement = document.createElement(this.elementTag);
    } else {
      htmlElement = document.createElement("DIV");
    }

    if (this.elementClass) {
      htmlElement.className = this.elementClass;
    }

    if (this.elementId) {
      htmlElement.id = this.elementId;
    }

    if (this.imageSrc) {
      htmlElement.src = this.imageSrc;
    }

    if (this.innerHTML) {
      htmlElement.innerHTML = this.innerHTML;
    }

    return htmlElement;
  };
}
/**
 * SVG USE contructor
 * @constructor
 */


function createSvg(n, a) {
  this.svgId = n, this.className = a, this.createSvg = function () {
    var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    e.setAttribute("class", a);
    var t = document.createElementNS("http://www.w3.org/2000/svg", "use");
    return t.setAttributeNS(null, "href", "#".concat(n)), e.appendChild(t), e;
  };
}