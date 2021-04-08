export default function createAttemptFunc(
  callback: Function,
  evaluator: Function,
  attempts: number = 20,
  ms: number = 300
) {
  let tryAttempt = 0;
  const startOver = () => {
    attempter();
  };

  function attempter() {
    if (tryAttempt < attempts) {
      setTimeout(() => {
        // Query to see the nodes availability in the DOM
        const node = evaluator();
        if (node) {
          // Setup mutateObserver
          callback(node);
          // Could do other things, like calling functions once if required
        } else {
          startOver();
        }
      }, ms);
      tryAttempt++;
    } else {
      return;
    }
  }
  return attempter;
}
