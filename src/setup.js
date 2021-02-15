export default function (config) {
  console.log(config);

  function setupResultInfoBox() {
    const targetList = document.querySelectorAll(".h-portal-list");
    const configuration = {
      targetListElement: targetList,
      stringToQuery: "Ingen resultater",
      onClickRedirectUrl: "?contact-method=14515",
      searchKey: "searchkey",
      infoText:
        "Vær en ægte Telia helt og super-kollega, og lad os vide at der mangler en guide. Klik blot herunder:",
      buttonText: "Der mangler en guide!",
    };
    const extender = new AceCustomizer.SearchResultExtender(configuration);
    if (!extender.infoBoxExistsAlready()) {
      extender.createInfoBox();
    }
  }

  // TOOD: REFACTOR - MAKE INTO AREA ON ITS OWN
  function convertLinksToIcons() {

    const converter = new AceCustomizer.InGuideLinkConverter({
      guideToQuery: "h-portal-guide.ng-scope",
      guideContentArea: "internversion",
      specialLinkIdentifiers: [{}],
    });

    // TODO: The guide is only found on the second mutation
    // Should probably introduce the attempter here as well
    if (converter.isGuideAvailable()) {
      console.log("guide is available!")
      converter.convertGuideLinks();
    }
  }

  /**
   * Triggers each time a mutation happens on the selected node
   */
  function observationTrigger() {
    if (config.convertLinks) {
      convertLinksToIcons();
    }
    if (config.accordions) {
      // This should not run every time on the modal accordions, but only on the guides, or when modal accordion is not activated
      accordions.init();
    }
    if (config.resultInfoBox) {
      setupResultInfoBox();
    }
  }

  function evaluator() {
    var node = document.querySelector(".breadcrumb");
    if (node) {
      return node;
    } else {
      return false;
    }
  }

  /**
   * Args: callback function and the evaluator, which is the function checking for the breadcrumb
   */
  const setupAttempter = new AceCustomizer.createAttemptFunc((targetNode) => {
    AceCustomizer.setupObserver(targetNode, observationTrigger);
  }, evaluator);

  setupAttempter();

  // DEVELOPMENT FOR CATHRIN
  document.addEventListener("DOMContentLoaded", function () {
    const contactMethodDetector = new AceCustomizer.HumanyNotificationDetector({
      urlQuery: "14515",
      InputFieldSelector: ".humany-component-value",
      targetInputName: "hvad-skrev-du-i-sogefeltet",
      searchKey: "searchkey",
    });

    // REFACTOR TO USE THE INITIATE ATTEMPT HELPER FUNCTION
    if (contactMethodDetector.detectUrl()) {

      const attempter = AceCustomizer.createAttemptFunc(
        contactMethodDetector.setInputFieldValue,
        () => {
          const node = document.querySelector(contactMethodDetector.InputFieldSelector);
          if (node) {
            return node;
          } else {
            return false;
          }
        }
      );
      attempter();
    }
  });
}
