export default function createAttemptFunc(
  callback: Function,
  evaluator: Function
) {
  var tryAttempt = 0;
  var callback = callback;
  var startOver = () => {
    attempter();
  };

  function attempter() {
    if (tryAttempt < 20) {
      setTimeout(() => {
        // Query to see the nodes availability in the DOM
        var node = evaluator();
        if (node) {
          // Setup mutateObserver
          callback(node);
          // Could do other things, like calling functions once if required
        } else {
          startOver();
        }
      }, 300);
      tryAttempt++;
    } else {
      return;
    }
  }
  return attempter;
}
