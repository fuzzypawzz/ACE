# Helpers
Documentation for helper functions

### Attempt function
- Uses timers will evaluate the condition of the "evaluator()" argument, and continue to call the callback if truthy.
- If evaluator returns false, the script will continue to set another timeout function, up to 20 iterations as currently configured.
- The function takes 2 callbacks as arguments and returns the "attempt()" closure.
```
{
  callback: Function,   // callback will recieve the returned node from evaluator as argument
  evaluator: Function   // The evaluator must return either a node or bool
}
```

### setupObserver function
The function takes 2 arguments:
- A targetNode for where the mutationObserver shall be set,
- A callback that should be passed as configuration for the mutationObserver. This will be called when a mutation is detected on the subtree. See MDN for more details about the mutationObserver.
```
AceCustomizer.setupObserver( targetNode, callback );
```