const placeholderHrefs = new Set(["", "#", "?"]);

function preventDemoPlaceholderNavigation(event: MouseEvent) {
  const target =
    event.target instanceof Element ? event.target.closest("a[href]") : null;

  if (!(target instanceof HTMLAnchorElement)) return;

  const href = target.getAttribute("href")?.trim() ?? "";

  if (placeholderHrefs.has(href)) {
    event.preventDefault();
  }
}

function preventDemoSubmit(event: SubmitEvent) {
  event.preventDefault();
}

export function demoPreviewGuards(node: HTMLElement) {
  node.addEventListener("click", preventDemoPlaceholderNavigation);
  node.addEventListener("submit", preventDemoSubmit);

  return {
    destroy() {
      node.removeEventListener("click", preventDemoPlaceholderNavigation);
      node.removeEventListener("submit", preventDemoSubmit);
    },
  };
}
