# About AceCustomizer
AceCustomizer is a Humany/ACE extension library in progress.
Humany / ACE knowledge portals is a service owned and provided by Telia Company.
There is multiple ways to modify the front-end code to provide a custom experience for the users.

### Dir explanation
* src - Contains the index file used by web pack to bundle the typeScript modules.
* dist - The bundle output dir
* areas - Contains the different library areas, their index files and all component specific functions and classes.
* services - Contains general re-usable functions for the library.
* modules - Contains old modules - not relevant any longer and will be removed soon.
* Scripts - Old bundled scripts used in production. These are currently being converted to TypeScript modules.
* Helpers - Various helper functions

### Setup development env.
* Clone the repo
* Run **npm install**
* For development: **npm run dev**
* For production bundling: **npm run prod**

### Preparing the ACE portal
* Only administrators will have access to the HTML block where script injections will happen
* Open the admin page and navigate to “Interfaces”
* Select the 3 dots on your portal and click “Custom HTML and JavaScript”
* Go to “ENABLE CUSTOM HTML AND JAVASCRIPT IN FOOTER
* Insert the script reference to the AceCustomizer bundle.js
* Write a script tag and put below code to initiate the setup of the mutationObserver:
```
AceCustomizer.setup(
  {
    convertLinks: true,   // Optional
    accordions: true,     // Optional
    resultInfoBox: true   // Optional
  }
)
```