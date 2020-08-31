import AdmZip, { IZipEntry } from 'adm-zip';
import cheerio from 'cheerio';
import FastGlob from 'fast-glob';
import { JSDOM } from 'jsdom';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, flatMap, map, toArray } from 'rxjs/operators';
import { argv } from 'yargs';
import { emptyDir$, readFile$, readFileMap, writeFile$ } from './fs$';
import { filterUndefined$, process } from './process';
import { noteCategoryProcessor } from './processors/note-categories-processor';
import { noteGroupProcessor } from './processors/note-groups-processor';
import {
  NoteOverlays,
  noteOverlaysProcessor,
} from './processors/note-types-processor';
import { NoteSettings } from './processors/NoteSettings';
import { NoteCategories } from './verse-notes/settings/note-gorup-settings';
import normalizePath = require('normalize-path');
import cuid = require('cuid');
export class ChapterProcessor {
  public chapterProcessor = map((document: Document) => {
    of(document.querySelectorAll('body > *'));
  });
}

const cache = normalizePath('./.cache');
export const unzipPath = normalizePath(`${cache}/unzip`);
export const flatPath = normalizePath(`${cache}/flat`);
export const sortPath = normalizePath(`${cache}/sort`);
// export const sortPath = normalizePath(`${cache}/sort`);

// const inputFolder = of(argv.i as string);

// function main(): void {}

// main();
export function hasArg(arg: string, argType: string) {
  return of(typeof argv[arg] === argType).pipe(filter((o) => o));
}

export function prepCache() {
  return emptyDir$(cache).pipe(
    map(() =>
      forkJoin(emptyDir$(unzipPath), emptyDir$(flatPath), emptyDir$(sortPath)),
    ),
    flatMap$,
  );
}

export const flatMap$ = flatMap(<T>(o: T[] | Observable<T> | Promise<T>) => o);
export function normalizePath$(pathName: string) {
  return of(normalizePath(pathName));
}
export function fastGlob$(pathName: string): Observable<string[]> {
  return normalizePath$(`${pathName}/**/**`).pipe(
    map((o) => FastGlob(o)),
    flatMap$,
    // flatMap$,
  );
}

export function endsWith(i: string[], val: string) {
  return i.filter((o) => val.endsWith(o)).length > 0;
}

export function unzipFiles(pathName: string): Observable<void[]> {
  return fastGlob$(pathName)
    .pipe(
      flatMap$,
      filter((o) => o.endsWith('.zip')),
      readFileMap,
      flatMap$,
      flatMap((o) => new AdmZip(o).getEntries()),
      filter((o) => endsWith(['.xml', '.html'], o.name)),
    )
    .pipe(
      map((o) =>
        writeFile$(
          normalizePath(`${unzipPath}/${cuid()}.${o.name.split('.').pop()}`),
          o.getData(),
        ),
      ),
      flatMap$,
      toArray(),
    );
  // return fast
}

export function loadnoteSettings(): Observable<
  [NoteOverlays, NoteCategories, NoteSettings]
> {
  return readFile$(argv.ns as string)
    .pipe(
      map((o) => new AdmZip(o).getEntries()),
      map((o) => {
        // console.log(o.map(i => i.name));

        return forkJoin(
          of(o.find((i) => i.name === 'note_types.html') as IZipEntry).pipe(
            filterUndefined$,
            map((i) =>
              noteOverlaysProcessor(new JSDOM(i.getData()).window.document),
            ),
          ),
          of(
            o.find((i) => i.name === 'note_categories.html') as IZipEntry,
          ).pipe(
            filterUndefined$,
            map((i) =>
              noteCategoryProcessor(new JSDOM(i.getData()).window.document),
            ),
            flatMap$,
          ),
          of(o.find((i) => i.name === 'note_groups.html') as IZipEntry).pipe(
            filterUndefined$,
            map((i) => noteGroupProcessor(cheerio.load(i.getData()))),
            flatMap$,
          ),
        );
      }),
    )
    .pipe(flatMap((o) => o));
}
processScriptures();

processSettings();

function processScriptures() {
  hasArg('all', 'boolean')
    .pipe(
      map(() =>
        forkJoin(hasArg('ns', 'string'), hasArg('i', 'string')).pipe(
          map(() => prepCache()),
          flatMap$,
          map(() => unzipFiles(argv.i as string)),
          flatMap$,
          map(() => {
            return loadnoteSettings().pipe(
              map(([nt, nc, ns]) => {
                // return of(nt);
                return forkJoin(
                  writeFile$(
                    `${flatPath}/eng-noteCategories.json`,
                    JSON.stringify(nc),
                  ),
                  writeFile$(
                    `${flatPath}/eng-noteTypes.json`,
                    JSON.stringify(nt),
                  ),
                  writeFile$(
                    `${flatPath}/eng-noteSettings.json`,
                    JSON.stringify(ns),
                  ),
                  process(nt, nc),
                );
              }),
              flatMap$,
            );
          }),
          flatMap((o) => o),
        ),
      ),
      flatMap$,
    )

    .subscribe((o) => o);
}

function processSettings() {
  hasArg('settings', 'string')
    .pipe(
      map(() =>
        forkJoin(hasArg('ns', 'string'), hasArg('i', 'string')).pipe(
          map(() => prepCache()),
          flatMap$,
          map(() => unzipFiles(argv.i as string)),
          flatMap$,
          map(() => {
            return loadnoteSettings().pipe(
              map(([nt, nc, ns]) => {
                // return of(nt);
                return forkJoin(
                  writeFile$(
                    `${flatPath}/${argv['settings']}-noteCategories.json`,
                    JSON.stringify(nc),
                  ),
                  writeFile$(
                    `${flatPath}/${argv['settings']}-noteTypes.json`,
                    JSON.stringify(nt),
                  ),
                  writeFile$(
                    `${flatPath}/${argv['settings']}-noteSettings.json`,
                    JSON.stringify(ns),
                  ),
                );
              }),
              flatMap$,
            );
          }),
          flatMap((o) => o),
        ),
      ),
      flatMap$,
    )

    .subscribe((o) => o);
}
// export const parseDocument = map(([buffer, extension]: [Buffer, string]) => {});

// of(FastGlob(normalizePath(`${argv.i}/**/**`))).pipe(
//   flatMap$,
//   flatMap$,
//   readFile$,
//   flatMap$,
//   map(p => {}),
// );
