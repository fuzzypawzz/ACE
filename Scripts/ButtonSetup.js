/**
 * Takes a configuration (array of objects),
 * Assigns click event listeners to the button, to toggle the modal element
 * buttonListenerConfigs:
 * [
		{
			buttonId: "uniqueElementId",
			modalId: "uniqueElementId",
		},
	]
 */
export default (function () {
  function ButtonSetup(buttonListenerConfigs) {
    // TODO: Introduce better error handling on config argument type checking
    if (!Array.isArray(buttonListenerConfigs)) {
      throw new Error("buttonListenerConfigs must be of type: Array ");
    }

    const _this = this;

    _this.buttonListenerConfigs = buttonListenerConfigs;
    methods.addListeners(_this.buttonListenerConfigs);

    //   _this.sayHello = () => {
    //     console.log("Hello World");
    //   };
  }

  const methods = {
    addListeners: function (buttonListenerConfigs) {
      buttonListenerConfigs.forEach((config) => {
        const button = document.getElementById(config.buttonId);
        const modal = document.getElementById(config.modalId);

        button.addEventListener("click", function () {
          if (modal.style.display == "block") {
            modal.style.display = "none";
          } else {
            modal.style.display = "block";
          }
        });
      });
    },
  };

  return ButtonSetup;
})();