import { decode } from 'he';
import { forkJoin, Observable, of, EMPTY, observable } from 'rxjs';
import { filter, flatMap, map, toArray } from 'rxjs/operators';
import {
  Chapter,
  FormatGroup,
  FormatText,
  Verse,
  VersePlaceholder,
} from '../../models/Chapter';
import { flatMap$ } from '../../rx/flatMap$';
import { DocType } from '../../verse-notes/verse-note';
import { parseDocID } from '../parseDocID';
import { asap } from 'rxjs/internal/scheduler/asap';

export const fixLink = map((i: Cheerio) => {
  const output = i.attr('href');
  if (
    output.endsWith(
      'manual/come-follow-me-for-individuals-and-families-new-testament-2019',
    )
  ) {
    i.attr(
      'href',
      `/manual/come-follow-me-for-individuals-and-families-new-testament-2019/title`,
    );
  }
  const r7 = /^.*(manual\/come-follow-me.*)\.html/g.exec(output);

  if (r7) {
    i.attr('href', `/${r7[1]}`);
    return;
  }

  const r2 = /^.*scriptures\/(gs)\/([a-z\d\-]+)\.html#(sec[a-z\d_]+)$/g.exec(
    output,
  );
  if (r2) {
    i.attr('href', `/${r2[1]}/${r2[2]}`);
    return;
  }

  const r3 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+\.html\?span=[^#]+)#p\d+$/g.exec(
    output,
  );
  if (r3) {
    i.attr('href', `/${r3[2]}/${r3[3]}`);
    return;
  }

  const r4 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(note|)(\d+)[a-z]#(note|)\d+[a-z]$/g.exec(
    output,
  );
  if (r4) {
    i.attr('href', `/${r4[2]}/${r4[3]}.${r4[5]}`);
    return;
  }

  const r5 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(\d+)&amp;context=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r5) {
    i.attr('href', `/${r5[2]}/${r5[3]}.${r5[4]}.${r5[5]}`);
    return;
  }
  const r51 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r51) {
    i.attr('href', `/${r51[2]}/${r51[3]}.${r51[4]}`);
    return;
  }

  const r6 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html$/g.exec(
    output,
  );
  if (r6) {
    i.attr('href', `/${r6[2]}/${r6[3]}`);
    return;
  }

  const r61 = /^.*scriptures\/jst\/(jst-[a-z\d\-]+\/\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r61) {
    i.attr('href', `/${r61[1]}`);
    return;
  }

  const r62 = /^.*scriptures(\/(bible|history)-maps\/map-\d+)\.html$/g.exec(
    output,
  );
  if (r62) {
    i.attr('href', `/${r62[1]}`);
    return;
  }

  const r8 = /^.*\/((manual|general-conference|ensign|liahona|new-era|friend).+)/g.exec(
    output,
  );

  if (r8) {
    i.attr('href', `https://churchofjesuschrist.org/study/${r8[1]}/`);
    return;
  }
});

export const fixLinkOther = (i: Cheerio) => {
  const output = i.attr('href');
  if (
    output.endsWith(
      'manual/come-follow-me-for-individuals-and-families-new-testament-2019',
    )
  ) {
    i.attr(
      'href',
      `/manual/come-follow-me-for-individuals-and-families-new-testament-2019/title`,
    );
  }
  const r7 = /^.*(manual\/come-follow-me.*)\.html/g.exec(output);

  if (r7) {
    i.attr('href', `/${r7[1]}`);
    return;
  }

  const r2 = /^.*scriptures\/(gs)\/([a-z\d\-]+)\.html#(sec[a-z\d_]+)$/g.exec(
    output,
  );
  if (r2) {
    i.attr('href', `/${r2[1]}/${r2[2]}`);
    return;
  }

  const r3 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+\.html\?span=[^#]+)#p\d+$/g.exec(
    output,
  );
  if (r3) {
    i.attr('href', `/${r3[2]}/${r3[3]}`);
    return;
  }

  const r4 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(note|)(\d+)[a-z]#(note|)\d+[a-z]$/g.exec(
    output,
  );
  if (r4) {
    i.attr('href', `/${r4[2]}/${r4[3]}.${r4[5]}`);
    return;
  }

  const r5 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=(\d+)&amp;context=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r5) {
    i.attr('href', `/${r5[2]}/${r5[3]}.${r5[4]}.${r5[5]}`);
    return;
  }
  const r51 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r51) {
    i.attr('href', `/${r51[2]}/${r51[3]}.${r51[4]}`);
    return;
  }

  const r6 = /^.*scriptures\/(ot|nt|bofm|dc-testament|pgp)\/([a-z\d\-]+)\/(\d+)\.html$/g.exec(
    output,
  );
  if (r6) {
    i.attr('href', `/${r6[2]}/${r6[3]}`);
    return;
  }

  const r61 = /^.*scriptures\/jst\/(jst-[a-z\d\-]+\/\d+)\.html\?verse=([^#]+)#p\d+$/g.exec(
    output,
  );
  if (r61) {
    i.attr('href', `/${r61[1]}`);
    return;
  }

  const r62 = /^.*scriptures(\/(bible|history)-maps\/map-\d+)\.html$/g.exec(
    output,
  );
  if (r62) {
    i.attr('href', `/${r62[1]}`);
    return;
  }

  const r8 = /^.*\/((manual|general-conference|ensign|liahona|new-era|friend).+)/g.exec(
    output,
  );

  if (r8) {
    i.attr('href', `https://churchofjesuschrist.org/study/${r8[1]}/`);
    return;
  }
};

function parseText(e: Cheerio) {
  return of(decode(e.text()));
}

function parseVerseFormat(
  $: CheerioStatic,
  verseE: CheerioElement,
  count: { count: number },
): Observable<FormatGroup[] | FormatText[]> {
  const isTextNode = verseE.type === 'text';
  $(verseE)
    .children()
    .toArray().length === 0;

  if (isTextNode) {
    const txt = decode($(verseE).text());

    const offsets = [count.count, count.count + txt.length];
    let ft: FormatText;
    if (offsets[0] === offsets[1]) {
      ft = {
        id: '',
        offsets: '',
        uncompressedOffsets: undefined,
        docType: DocType.FORMATTEXT,
      };
    } else {
      ft = {
        id: '',
        offsets: `${count.count}-${count.count + txt.length - 1}`,
        uncompressedOffsets: undefined,
        docType: DocType.FORMATTEXT,
      };

      count.count = count.count + txt.length;
    }

    if (ft) {
      $(verseE)
        .parent()
        .attr('offsets', `${ft.offsets}`);

      $(verseE).attr('offsets', `${ft.offsets}`);
    }

    return of([ft]);
  } else {
    return of(verseE.children).pipe(
      flatMap$,
      map(i => {
        return forkJoin(of(i), parseVerseFormat($, i, count));
      }),
      flatMap(o => o),
      map(
        ([e, ft]): FormatGroup => {
          return {
            attrs: $(e).attr(),
            name: e.name,
            grps: ft,
            docType: DocType.FORMATGROUP,
          };
        },
      ),
      toArray(),
      map(o => o),
    );
  }
}

function parseVerseID(vID: string) {
  const id = /^(p)([0-9]*)/g.exec(vID);
  return `${id ? id[2] : vID}`;
}

function parseID(e: Cheerio) {
  return of(parseVerseID(e.prop('id')));
}

function parseVerse($: CheerioStatic, verseE: CheerioElement) {
  return forkJoin(
    parseID($(verseE)),
    parseText($(verseE)),
    parseVerseFormat($, verseE, { count: 0 }),
  ).pipe(
    map(
      ([id, text, tgs]): Verse => {
        return new Verse(
          id,
          text,
          tgs as FormatGroup[],
          verseE.name.toLowerCase(),
          verseE.attribs,
        );
      },
    ),
  );
}

function parseVerses($: CheerioStatic) {
  return of($('body [data-aid]').toArray()).pipe(
    flatMap$,
    filter(o => {
      const id = o.attribs['id'];

      return id !== undefined && !id.includes('note');
    }),
    map(o => parseVerse($, o)),
    flatMap$,
    toArray(),
  );
}

function fixLinks($: CheerioStatic) {
  const links = $('[href]').toArray();

  return of(links).pipe(
    filter(o => o.length > 0),
    flatMap$,
    map(o => $(o)),
    fixLink,
    toArray(),
  );
}

export function childrenToArray(
  $: CheerioStatic,
  selector: string | CheerioElement | Cheerio,
) {
  return of(
    $(selector)
      .children()
      .toArray(),
  ).pipe(flatMap(o => o));
}

function newParseChildre(
  $: CheerioStatic,
  element: Cheerio,
): Observable<FormatGroup> {
  return of(element.children().toArray()).pipe(
    flatMap$,
    map(o => {
      if (typeof $(o).prop('data-aid') === 'string') {
        return of({
          v: parseVerseID($(o).prop('id') as string),
        } as VersePlaceholder);
      }
      if ($(o).hasClass('study-notes')) {
        return EMPTY;
      }
      return newParseChildre($, $(o));
    }),
    flatMap(o => o),
    toArray(),
    map(
      (o): Observable<FormatGroup> => {
        try {
          $(element).prop('nodeName');
        } catch (error) {
          return EMPTY;
        }

        const nodeName = $(element).prop('nodeName') as string;
        const cls = $(element).prop('class');
        const f = $(element).attr();
        const l = Object.keys(f).length;

        return of({
          name: nodeName,
          grps: o, //formatGroups.length > 0 ? formatGroups : undefined,
          attrs: l > 0 ? $(element).attr() : undefined,
          docType: DocType.FORMATGROUP,
        });
      },
    ),
    flatMap$,
  );
}

function parseBody($: CheerioStatic) {
  return newParseChildre($, $('body'));
}

function parseTitle($: CheerioStatic) {
  return of(
    decode(
      $('[type=citation]')
        .first()
        .text(),
    ),
  );
}

function parseShortTitle($: CheerioStatic) {
  return of(decode($('[type*=short-citation]').text()));
}
export function chapterProcessor(
  $: CheerioStatic,
): Observable<[Chapter, CheerioStatic]> {
  const header = $('header');
  return prepChapter($).pipe(
    map(([id]) => {
      return forkJoin(
        of(id),
        fixLinks($),
        parseBody($),
        parseTitle($),
        parseShortTitle($),
      );
    }),
    flatMap$,
    map(([id, i, body, title, shortTitle]) => {
      i;
      return forkJoin(parseVerses($)).pipe(
        map(([verses]): [Chapter, CheerioStatic] => {
          const chapter = new Chapter(
            `${id}-chapter`,
            $('html').prop('lang'),
            title,
            shortTitle,
            '',
            verses,
            body,
          );

          return [chapter, $];
        }),
      );
    }),
    flatMap(o => o),
  );
}

function removeUnneededClasses($: CheerioStatic) {
  return of(
    ['scripture-ref', 'study-note-ref'].map(s => $(`.${s}`).removeClass(s)),
  );
}

function removeUnneededElements($: CheerioStatic) {
  // /, 'footer.study-notes'
  return of(['sup.marker']).pipe(
    flatMap$,
    map(o => $(o).remove()),
    toArray(),
  );
}

function prepChapter($: CheerioStatic) {
  return forkJoin(removeUnneededClasses($), removeUnneededElements($)).pipe(
    map(() => {
      return forkJoin(parseDocID($));
    }),
    flatMap$,
  );
}
