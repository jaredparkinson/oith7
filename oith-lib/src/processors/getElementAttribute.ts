export function getElementAttribute(
  element: HTMLElement | Element,
  attr: string,
): string {
  const val = element.getAttribute(attr);

  return val ? val : '';
}
