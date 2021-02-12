import ClassNames from "../../search-result-extender/constants/ClassNames";
const Handlebars = require("handlebars");

export const searchResultInfoBox = Handlebars.compile(`
    <div class="${ClassNames.wrapper}" id="superwoman-no-result">
        {{{ svg }}}
        <p class="${ClassNames.text}" ">{{ infoText }}</p>
        <button id="no-guide-result-report" class="${ClassNames.button}">{{ buttonText }}</button>
    </div>
`);
