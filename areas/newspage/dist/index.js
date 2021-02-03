"use strict";
exports.__esModule = true;
var GuideFetcher_1 = require("../../services/GuideFetcher");
var HtmlTableParser_1 = require("../../services/HtmlTableParser");
var newsItemFragmentGenerator_1 = require("../newspage/functions/newsItemFragmentGenerator");
var returnTableInBody_1 = require("../newspage/functions/returnTableInBody");
var tableDataTrimmer_1 = require("../newspage/functions/tableDataTrimmer");
var NewsPage = /** @class */ (function () {
    /**
     *
     * @param newsPageConfig See the INewsPageConfig interface
     * { segment: "tjekit-all-brand", guideIds: [32323, 23232, 1232131], tableElementId: "_someId" }
     */
    function NewsPage(newsPageConfig) {
        if (!newsPageConfig) {
            throw new Error("Configuration missing.");
        }
        this.guideIds = newsPageConfig.guideIds;
        this.tableElementId = newsPageConfig.tableElementId;
        this.segment = newsPageConfig.segment;
        this.handler = this.handler.bind(this);
    }
    NewsPage.prototype.init = function () {
        var _this = this;
        // Get the table data by using the fetcher module to fetch each guide
        this.guideIds.forEach(function (id) {
            var configuration = {
                segment: _this.segment,
                tableElementId: _this.tableElementId,
                id: id,
                callback: _this.handler,
                mockRequestUrl: "http://127.0.0.1:5500/"
            };
            new GuideFetcher_1["default"](configuration).get();
        });
    };
    NewsPage.prototype.handler = function (htmlBody) {
        var table = returnTableInBody_1["default"](htmlBody, this.tableElementId);
        // TODO: Use error message from constants
        if (!table) {
            throw new Error("Table of news was not found. Make sure the id of the element is correct.");
        }
        console.log(table);
        var tableData = new HtmlTableParser_1["default"](table).tableDataToList();
        console.log(tableData);
        var cleanData = tableDataTrimmer_1["default"](tableData);
        console.log(cleanData);
        var fragment = newsItemFragmentGenerator_1["default"](tableData);
        document.querySelector("body").appendChild(fragment);
    };
    return NewsPage;
}());
exports["default"] = NewsPage;
