export default function setupObserver(targetNode: Node, callback: any) {
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
  console.log("setting up observer has finished");
}
