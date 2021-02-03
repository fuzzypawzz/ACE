"use strict";
exports.__esModule = true;
var createNewsItemTemplate_1 = require("../../newspage/TemplateEngine/createNewsItemTemplate");
var BaseTemplateElement_1 = require("../../newspage/TemplateEngine/BaseTemplateElement");
function newsItemFragmentGenerator(data) {
    var fragment = document.createDocumentFragment();
    // TODO: Get element id prefix from constant
    data.forEach(function (object) {
        var dataForTemplate = {
            // TODO: Write a test for this, when id does not exist
            author: object.afsender,
            date: object.dag,
            headline: object.overskrift,
            body: object.tekst,
            id: object.id
        };
        var queryStringTemplate = createNewsItemTemplate_1["default"](dataForTemplate);
        var element = new BaseTemplateElement_1["default"](queryStringTemplate, dataForTemplate).returnElement();
        fragment.appendChild(element);
    });
    return fragment;
}
exports["default"] = newsItemFragmentGenerator;
