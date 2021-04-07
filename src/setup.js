/**
 * 
 * @param {object} config Setup configuration, see arguments below:
 * @argument {boolean} config.accordions Should accordions module be activated? - OPTIONAL
 * @argument {boolean} config.convertLinks Should the inguide-special links module be activated? - OPTIONAL
 * @argument {string} config.evaluatorSelector The selector for the evaluator element. Could be ".breadcrumb"..
 * @argument {boolean} config.resultInfoBox Should the result info box module be activated? - OPTIONAL
 */
export default function (config) {
  console.log(config);

  if (!config.evaluatorSelector) {
    throw new Error(
      "Attention! Ace Customizer will not work without the 'readyEvaluator' config property"
    );
  }

  const setupResultInfoBox = () => {
    const extender = new AceCustomizer.SearchResultExtender({
      targetListElement: document.querySelectorAll(config.resultInfoBox.targetListElement),
      stringToQuery: config.resultInfoBox.stringToQuery,
      onClickRedirectUrl: config.resultInfoBox.onClickRedirectUrl,
      searchKey: config.resultInfoBox.searchKey,
      infoText: config.resultInfoBox.infoText,
      buttonText: config.resultInfoBox.buttonText,
    });

    if (!extender.infoBoxExistsAlready()) {
      extender.createInfoBox();
    }
  };

  // TOOD: REFACTOR - MAKE INTO AREA ON ITS OWN
  const convertLinksToIcons = () => {
    const converter = new AceCustomizer.InGuideLinkConverter({
      guideToQuery: "h-portal-guide.ng-scope",
      guideContentArea: "internversion",
      specialLinkIdentifiers: [{}],
    });

    // TODO: The guide is only found on the second mutation
    // Should probably introduce the attempter here as well
    if (converter.isGuideAvailable()) {
      converter.convertGuideLinks();
    }
  };

  /** This function will be called with every mutation on the selected node */
  const observationTrigger = () => {
    config.convertLinks ? convertLinksToIcons() : null;
    // TODO: This should not run every time on the modal accordions, but only on the guides
    // ..or when modal accordion is not activated
    config.accordions ? accordions.init() : null;
    config.resultInfoBox.activate ? setupResultInfoBox() : null;
  };

  /** The evaluator is used to find out when it's safe to setup the library */
  const evaluator = () => {
    const node = document.querySelector(config.evaluatorSelector);
    return node ? node : false;
  };

  /** The callback takes the returned node from evaluator() and starts the observer */
  const callback = (targetNode) => {
    AceCustomizer.setupObserver(targetNode, observationTrigger);
  };

  /** Start once the evaluator returns a node */
  new AceCustomizer.createAttemptFunc(callback, evaluator)();
}
