export default (function () {
  // Contructor
  function ModalInitiater(configuration) {
    let _this = this;
    _this.guideHtml = configuration.guideHtml;
    _this.callback = configuration.callback;
    _this.guideContentSectionId = configuration.guideContentSectionId;
    _this.modalCloseButtonId = configuration.modalCloseButtonId;
    _this.modalElementId = configuration.modalElementId;

    if (_this.modalCloseButtonId && _this.modalElementId) {
      methods.addHtmlToElement(_this.guideHtml, _this.guideContentSectionId);
      methods.addCloseBtnListener(_this.modalCloseButtonId, _this.modalElementId);

      if (_this.callback) {
        _this.callback();
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

// module.exports = {
//   ModalInitiater
// };