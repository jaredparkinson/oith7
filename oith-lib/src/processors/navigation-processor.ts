import { parseDocID } from './parseDocID';
import { of, forkJoin } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { decode } from 'he';
import { uniq, isEqual } from 'lodash';
import { writeFile$ } from '../fs$';
function parseNavId($: CheerioStatic) {
  return parseDocID($).pipe(map(o => o.replace('_manifest', 'manifest')));
}

function parseNavTitle($: CheerioStatic) {
  return of(decode($('body > header > h1').text()));
}
function parseNavShortTitle($: CheerioStatic) {
  return of(decode($('head [type="short-citation"]').text()));
}

export class NavigationItem {
  public title: string;
  public shortTitle: string;
  public dateState?: string;
  public dateEnd?: string;
  public navigationItems?: NavigationItem[];
  public href?: string;

  public constructor(
    title: string,
    shortTitle: string,
    href?: string,
    navigationItems?: NavigationItem[],
    dateState?: string,
    dateEnd?: string,
  ) {
    this.title = title;
    this.shortTitle = shortTitle;
    if (href && !href.includes('#map')) {
      const regHref = /(^.+)\.html/g.exec(href ? href : '');

      this.href = regHref ? regHref[1] : href;
    } else {
      this.href = undefined;
    }

    this.navigationItems = navigationItems;
    this.dateState = dateState;
    this.dateEnd = dateEnd;
  }
}

function parseChildNodeNames(element: CheerioElement) {
  return uniq(
    element.children.filter(n => n.name !== undefined).map(n => n.name),
  );
}

function filterTextNodes(element: CheerioElement) {
  return element.children.filter(c => c.name !== undefined);
}

function parseNavigation($: CheerioStatic, listItems: CheerioElement[]) {
  return listItems.map(li => {
    const dateStart = li.attribs['data-date-start'];
    const dateEnd = li.attribs['data-date-end'];
    const href = $(li)
      .find('a')
      .attr('href');
    const title = $(li)
      .find('.title')
      .first()
      .text();
    const shortTitle = $(li)
      .find('.title,.title-number')
      .first()
      .text();

    return new NavigationItem(
      title,
      shortTitle,
      href,
      undefined,
      dateStart,
      dateEnd,
    );
  });
}

function parseTopLevelNav($: CheerioStatic, elem: CheerioElement) {
  return parseNavigation(
    $,
    $(elem)
      .find('li')
      .toArray(),
  );
}

function parseNav($: CheerioStatic, elem: CheerioElement) {
  const monthOrTitle = $(elem)
    .find('a[href*="#map"] p.title, p.title')
    .first()
    .text();
  const monthOrShortTitle = $(elem)
    .find('a[href*="#map"] p.title, p.short-title')
    .first()
    .text();

  const childNavigation = parseNavigation(
    $,
    $(elem)
      .find('li')
      .toArray(),
  );
  return new NavigationItem(
    monthOrTitle,
    monthOrShortTitle,
    undefined,
    childNavigation,
    undefined,
    undefined,
  );
}
// Top Level Navigation is are items that are only children of the manifest, like single chapter books. Jarom and Omni are examples of this, or the Introduction of back matter
function comeFollowMeAndTopLevelNavigation(
  $: CheerioStatic,
  element: CheerioElement,
) {
  // li represents top level navigation
  const li = ['li'];

  //aUL represents Come Follow Me Months
  const aUL = ['a', 'ul'];

  // Similar ot Come Follow Me, just with title and short title instead of months
  const pUL = ['p', 'ul'];

  return filterTextNodes(element).map(c => {
    const nodeNames = parseChildNodeNames(c);
    if (isEqual(aUL, nodeNames) || isEqual(pUL, nodeNames)) {
      return parseNav($, c);
      // console.log(cfmNav);
    } else {
      return parseTopLevelNav($, element);
      // console.log('topLevel');

      // console.log(topLevel);
    }
  });
}

function parseManifest($: CheerioStatic) {
  const topLevel = $('body > nav.manifest > *')
    .toArray()
    .filter(o => o.name !== undefined && !$(o).hasClass('doc-map-index'))
    .map(topLevelElement => {
      const childNames = parseChildNodeNames(topLevelElement);

      const classList = topLevelElement.attribs['class'];

      // This is for navigation item children
      const headerUL = ['header', 'ul'];

      // This is Come Follow Me Navigation;
      const li = ['li'];

      if (isEqual(childNames, li)) {
        return comeFollowMeAndTopLevelNavigation($, topLevelElement);
      }
      const aUL = ['a', 'ul'];
      if (isEqual(childNames, headerUL)) {
        // filterTextNodes(topLevelElement).map(e => {
        // });

        return parseNav($, topLevelElement);
        // console.log(asdf);
      }
      return [];
      console.log('oiasjdfoiajsdfoiajsd foiajsdofij');
    });
  return of(topLevel);
}

export function navigationProcessor($: CheerioStatic) {
  forkJoin(
    parseNavId($),
    parseNavTitle($),
    parseNavShortTitle($),
    parseManifest($),
  )
    .pipe(
      map(o => {
        return writeFile$(`./${o[0]}.json`, JSON.stringify(o[3]));
      }),
      flatMap(o => o),
    )
    .subscribe();
}
