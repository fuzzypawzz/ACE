# About Notification Detector
- This module provides functionality to check whether the current page is showing a specific contact method modal.
- The script checks whether the loaded page url contains the contact method id.
- If it contains the ID, then it uses timers to check if the when the contact method modal has been loaded in the DOM.
- When the contact method is loaded, it continues to parse the URL and grab the defined URL parameter..
- ..and then insert the value from the URL parameter into the specific input field in the contact method modal.

### How to instanciate (proposal for how you could set it up)
```
document.addEventListener("DOMContentLoaded", function () {
  var contactMethodDetector = new AceCustomizer.HumanyNotificationDetector({
    urlQuery: [YOUR CONTACT METHOD ID],
    InputFieldSelector: ".humany-component-value",
    targetInputName: [FIELD NAME IN CONTACT METHOD],
    searchKey: [URL PARAM NAME],
  });

  if (contactMethodDetector.detectUrl()) {
    var _retryAttempt = 0;
    function resetTimer() {
      if (_retryAttempt > 20) {
        return;
      }
      setTimeout(() => {
        checkContactMethodLoaded();
      }, 600);
      _retryAttempt++;
    }

    function checkContactMethodLoaded() {
      var node = document.querySelector(".humany-component-value");
      if (!node) {
        resetTimer();
      } else {
        contactMethodDetector.setInputFieldValue();
      }
    }
    checkContactMethodLoaded();
  }
});
```