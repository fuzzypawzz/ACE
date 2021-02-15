# About InGuideLinkConverter
- This module looks for anchor tags (links) with specific innerText identifiers.
- When the specific anchor tag is found, it is converted into an icon and placed in a DIV container on the top right side inside in the guide.
- The idea is that the user can make specific buttons on a guide, for showing there is downloadable material available or similar.

### Initialise
´´´
const converter = new AceCustomizer.InGuideLinkConverter({
      guideToQuery: "h-portal-guide.ng-scope",     // MUST BE A CLASSNAME THAT IS ONLY SHOWN WHEN GUIDE IS VISIBLE
      guideContentArea: "internversion",           // MUST BE AN ELEMENT ID
      specialLinkIdentifiers: [{}],                // TO BE IMPLEMENTED LATER (FEBRUARY 15TH 2021)
    });

    // We only call the converter functionality when a guide is shown:
    if (converter.isGuideAvailable()) {
      console.log("A guide is showing in the page.")
      converter.convertGuideLinks();
    }
´´´