export default function createAttemptFunc(
  callback: Function,
  evaluator: Function
) {
  console.log("createAttemptFunc");
  var tryAttempt = 0;
  var callback = callback;
  var startOver = () => {
    console.log("startOver");
    attempter();
  };

  function attempter() {
    console.log("attempter");
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
