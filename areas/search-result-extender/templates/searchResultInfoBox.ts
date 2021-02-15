import ClassNames from "../../search-result-extender/constants/ClassNames";
import Ids from "../constants/Ids";
const Handlebars = require("handlebars");

export const searchResultInfoBox = Handlebars.compile(`
    <div class="${ClassNames.wrapper}" id="${Ids.searchResultInfoBoxId}">
        {{{ svg }}}
        <p class="${ClassNames.text}" ">{{ infoText }}</p>
        <button id="no-guide-result-report" class="${ClassNames.button}">{{ buttonText }}</button>
    </div>
`);
