export function getElementScrollPosition(selector: string) {
  const chapterLoader = document.querySelector(selector);
  return chapterLoader ? chapterLoader.scrollTop : 0;
}
