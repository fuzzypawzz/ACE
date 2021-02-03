import ClassNames from "../Constants/NewsItemClassNames";
const Handlebars = require("handlebars");

export const latestNewsContainer = Handlebars.compile(`
    <div id="HumanyCustom-latest-news" style="display: block;">
        <div class="HumanyCustom-latest-news-header">
            <h4 class="HumanyCustom-latest-news-headline">
                <i class="fa fa-inbox">
                    <span class="tsPebble spanBeforeIcon">Seneste nyheder</span>
                </i>
            </h4>
            <p class="humany-latest-news-counter">
                Der er <span class="newsCountBadge">{{newsFromTodayAmount}}</span>{{newsFromTodayText}}
            </p>
        </div>
    </div>
`);
