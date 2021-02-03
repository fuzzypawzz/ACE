"use strict";
exports.__esModule = true;
var NewsItemClassNames_1 = require("../Constants/NewsItemClassNames");
/**
 *
 * @param data data object for merging into template queryString
 * @returns a queryString template that can set to an Element's innerHTML.
 */
function createNewsItemTemplate(data) {
    var template = "\n    <div class=\"" + NewsItemClassNames_1["default"].wrapper + "\">\n        <section class=\"" + NewsItemClassNames_1["default"].header + "\">\n            <div class=\"" + NewsItemClassNames_1["default"].logoWrapper + "\">\n                <svg class=\"" + NewsItemClassNames_1["default"].svg + "\">\n                    <use href=\"#_teliaPebbleIcon26\"></use>\n                </svg>\n            </div>\n            <div class=\"" + NewsItemClassNames_1["default"].authorAndDateWrapper + "\">\n                <h2 class=\"" + NewsItemClassNames_1["default"].author + "\">" + data.author + "</h2>\n                <h3 class=\"" + NewsItemClassNames_1["default"].date + "\">" + data.date + "</h3>\n            </div>\n        </section>\n        <section class=\"" + NewsItemClassNames_1["default"].newsContentWrapper + "\">\n            <h3 class=\"" + NewsItemClassNames_1["default"].newsContentHeadline + "\">" + data.headline + "</h3>\n            <section class=\"" + NewsItemClassNames_1["default"].newsContentBody + "\">" + data.body + "</section>\n        </section>\n    </div>\n    ";
    return template;
}
exports["default"] = createNewsItemTemplate;
