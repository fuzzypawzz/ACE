import ClassNames from "../Constants/NewsItemClassNames";
import TableKeys from "../Constants/TableKeys";
const Handlebars = require("handlebars");

Handlebars.registerHelper(
  "determineNewsFromTodayText",
  function (count: string) {
    const integer = parseInt(count, 10);
    return integer == 1 ? "nyhed fra i dag" : "nyheder fra i dag";
  }
);

export const latestNewsContainer = Handlebars.compile(`
    <div id="HumanyCustom-latest-news" class="${ClassNames.latestNewsContainer}" style="display: block;">
        <div class="HumanyCustom-latest-news-header">
            <h4 class="HumanyCustom-latest-news-headline">
                <i class="fa fa-inbox">
                    <span class="tsPebble spanBeforeIcon">{{ latestNewsHeadline }}</span>
                </i>
            </h4>
            <p class="humany-latest-news-counter">
                Der er <span class="newsCountBadge">{{ newsFromTodayCounter }}</span>
                {{ determineNewsFromTodayText newsFromTodayCounter }}
            </p>
        </div>
        {{#each entries}}
            <div class="latestNewsItem">
                <div class="latestNewsHeadline">
                    <i class="fa fa-info-circle iconToTextGap tsPurple"></i>
                    {{ this.${TableKeys.HEADLINE} }}
                </div>
                <div class="latestNewsDate">{{ this.${TableKeys.DATE_STRING} }}</div>
            </div>
        {{/each}}
    </div>
`);
