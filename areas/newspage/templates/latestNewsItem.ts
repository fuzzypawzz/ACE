import ClassNames from "../Constants/NewsItemClassNames";
const Handlebars = require("handlebars");

export const latestNewsItemTemplate = Handlebars.compile(`
    <div class="latestNewsItem">
        <div class="latestNewsHeadline">
            <i class="fa fa-info-circle iconToTextGap tsPurple"></i>
            {{headline}}
        </div>
        <div class="latestNewsDate">{{date}}</div>
    </div>
`);
