import ClassNames from "../Constants/NewsItemClassNames";
const Handlebars = require("handlebars");

// TODO: Refractor how photos are handled to become conditionally
// TODO: Refractor how links are handled to become conditionally,
// ..and links should be rendered as buttons

export const newsItemTemplate = Handlebars.compile(`
    <div class="${ClassNames.wrapper}">
        <section class="${ClassNames.header}">
            <div class="${ClassNames.logoWrapper}">
                <svg class="${ClassNames.svg}">
                    <use href="#_teliaPebbleIcon26"></use>
                </svg>
            </div>
            <div class="${ClassNames.authorAndDateWrapper}">
                <h2 class="${ClassNames.author}">{{author}}</h2>
                <h3 class="${ClassNames.date}">{{date}}</h3>
            </div>
        </section>
        <section class="${ClassNames.newsContentWrapper}">
            <h3 class="${ClassNames.newsContentHeadline}">{{headline}}</h3>
            <section class="${ClassNames.newsContentBody}">{{{body}}}</section>
        </section>
        <section class="${ClassNames.newsContentPhotos}">
            {{{photos}}}
        </section>
        <section class="${ClassNames.newsContentLinks}">
            {{{links}}}
        </section>
    </div>
`);
