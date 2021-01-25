let ModalInitiater = (function () {
  // Contructor
  function ModalInitiater(configuration) {
    console.log("modal running")
    this.guideHtml = configuration.guideHtml;
    this.callback = configuration.callback;
    this.guideContentSectionId = configuration.guideContentSectionId;
    this.modalCloseButtonId = configuration.modalCloseButtonId;
    this.modalElementId = configuration.modalElementId;

    if (this.modalCloseButtonId && this.modalElementId) {
      // Do some stuff
      methods.addHtmlToElement(this.guideHtml, this.guideContentSectionId);
      methods.addCloseBtnListener(this.modalCloseButtonId, this.modalElementId);

      if (this.callback) {
        this.callback();
      }
    } else {
      throw new Error("Configuration is not correct!");
    }
  }

  // Private func/vars
  const methods = {
    addCloseBtnListener: function (modalCloseButtonId, modalElementId) {
      if (modalCloseButtonId && modalElementId) {
        document
          .querySelector(`#${modalCloseButtonId}`)
          .addEventListener("click", function () {
            let modal = document.querySelector(`#${modalElementId}`);
            modal.style.display = "none";
          });
      } else {
        throw new Error(
          "modalCloseButtonId or modalElementId not present in configuration"
        );
      }
    },

    addHtmlToElement: function (guideHtml, guideContentSectionId) {
      if (guideContentSectionId && guideHtml) {
        let div = document.createElement("DIV");
        div.innerHTML = guideHtml;
        let section = document.querySelector(`#${guideContentSectionId}`);
        section.appendChild(div);
      } else {
        throw new Error(
          "GuideContentSectionId or guideHtml is not present in configuration"
        );
      }
    },
  };

  return ModalInitiater;
})();

module.exports = {
  ModalInitiater
};