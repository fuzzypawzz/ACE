# How to setup the modal initiator
```
/* Initiate new instance of ModalInitiater from the AceCustomizer libary */
  /* Pass in required configuration as an object */
  /*
        {
            guideHtml: (required) "The HTML which should be placed inside the modal",
            callback: (optional) "Pass in a function to callback",
            guideContentSectionId (required),
            modalCloseButtonId (required),
            modalElementId (required)
        }
  */
new AceCustomizer.ModalInitiater({
    guideHtml: HTMLForMyModal,                       // REQUIRED
    callback: myCallbackFuntion,                     // OPTIONAL
    guideContentSectionId: "guideContentSectionId",  // REQUIRED
    modalCloseButtonId: "modalCloseButtonId",        // REQUIRED
    modalElementId: "modalElementId"                 // REQUIRED
  });
```