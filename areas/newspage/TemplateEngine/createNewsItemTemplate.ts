import ClassNames from "../Constants/NewsItemClassNames";
const Handlebars = require("handlebars");
import TableKeys from "../Constants/TableKeys";

// TODO: Multiple links should be rendered as buttons

export const newsBlockTemplate = Handlebars.compile(`
    <div class="${ClassNames.sectionWrapper}">
    {{#each entries}}
        <div class="${ClassNames.itemWrapper}">
            <section class="${ClassNames.header}">
                {{#if ../logo}}
                    <div class="${ClassNames.logoWrapper}">
                        {{../logo}}
                    </div>
                {{/if}}
                <div class="${ClassNames.authorAndDateWrapper}">
                    <h2 class="${ClassNames.author}"> {{ this.${TableKeys.AUTHOR} }} </h2>
                    <h3 class="${ClassNames.date}"> {{ this.${TableKeys.DATE_STRING} }} </h3>
                </div>
            </section>
            <section class="${ClassNames.newsContentWrapper}">
                <h3 class="${ClassNames.newsContentHeadline}"> {{ this.${TableKeys.HEADLINE} }} </h3>
                <section class="${ClassNames.newsContentBody}"> {{{ this.${TableKeys.CONTENT_TEXT} }}} </section>
            </section>
            {{#if this.${TableKeys.IMG}}}
                <section class="${ClassNames.newsContentPhotos}">
                    {{{ this.${TableKeys.IMG} }}}
                </section>
            {{/if}}
            {{#if this.${TableKeys.HREF}}}
                <section class="${ClassNames.newsContentLinks}">
                    {{{ this.${TableKeys.HREF} }}}
                </section>
            {{/if}}
        </div>
        {{/each}}
    </div>
`);
