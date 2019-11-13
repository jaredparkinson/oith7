import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { flatMap, map, filter } from "rxjs/operators";
import { ChapterComponent } from "../../components/chapter.component";
import Layout from "../../components/layout";
import { VerseNotesShellComponent } from "../../components/verse-notes-shell";
import {
  Verse,
  FormatGroup,
  FormatText,
  Chapter
} from "../../oith-lib/src/models/Chapter";
import {
  addVersesToBody,
  buildNewShell
} from "../../oith-lib/src/shells/build-shells";
import { store } from "./Store";

// import { fetch } from "http";
function Testat() {
  return <h1>Test</h1>;
}

// export default function Index(props: string) {
//   return (
//     <div>
//       <Header />
//       {props}
//       <p>Hello Next.js</p>
//       <Testat />
//     </div>
//   );
// }

export type ImgAttr = {
  src: string;
  alt: string;
};

// export function ftLink(attrs )

function formatVerses(verses?: Verse[]) {
  if (verses) {
    return verses.map(verse => {
      switch (verse.n) {
        case "p": {
          return <p>{formatGroups(verse.grps, verse)}</p>;
        }
        case "h2": {
          return <h2>{formatGroups(verse.grps, verse)}</h2>;
        }
        case "h1": {
          return <h1>{formatGroups(verse.grps, verse)}</h1>;
        }
        case "h3": {
          return <h3>{formatGroups(verse.grps, verse)}</h3>;
        }
        case "h4": {
          return <h4>{formatGroups(verse.grps, verse)}</h4>;
        }
        case "p": {
          return <p>{formatGroups(verse.grps, verse)}</p>;
        }
        case "p": {
          return <p>{formatGroups(verse.grps, verse)}</p>;
        }
        case "p": {
          return <p>{formatGroups(verse.grps, verse)}</p>;
        }
        case "p": {
          return <p>{formatGroups(verse.grps, verse)}</p>;
        }
        default:
          break;
      }
      return (
        <p>
          {verse.text}-jhhgfdd{formatGroups(verse.grps, verse)}
        </p>
      );
    });
  }
  return;
}
function formatGroup(grp: FormatGroup, verse?: Verse) {
  return (
    <Fragment>
      {formatGroups(grp.grps, verse)}
      {formatVerses(grp.verses)}
    </Fragment>
  );
}

function formatGroups(grps?: (FormatGroup | FormatText)[], verse?: Verse) {
  if (grps) {
    return grps.map(grpTxt => {
      if (grpTxt.docType === 4) {
        const grp = grpTxt as FormatGroup;

        if (
          grp.attrs &&
          (grp.attrs as { class: string })["class"] !== undefined
        ) {
          (grp.attrs as { className: string }).className = (grp.attrs as {
            class: string;
          }).class;

          (grp.attrs as { class?: string }).class = undefined;
        }
        // return <h1>{grp.name}</h1>;
        switch (grp.name) {
          case "HEADER": {
            return <header {...grp.attrs}>{formatGroup(grp, verse)}</header>;
          }
          case "SECTION": {
            return <section {...grp.attrs}>{formatGroup(grp, verse)}</section>;
          }
          case "UL": {
            return <ul {...grp.attrs}>{formatGroup(grp, verse)}</ul>;
          }
          case "LI": {
            return <li {...grp.attrs}>{formatGroup(grp, verse)}</li>;
          }
          case "DL": {
            return <dl {...grp.attrs}>{formatGroup(grp, verse)}</dl>;
          }
          case "h1": {
            return <h1 {...grp.attrs}>{formatGroup(grp, verse)}</h1>;
          }
          case "h2": {
            return <h2 {...grp.attrs}>{formatGroup(grp, verse)}</h2>;
          }
          case "h3": {
            return <h3 {...grp.attrs}>{formatGroup(grp, verse)}</h3>;
          }
          case "h4": {
            return <h4 {...grp.attrs}>{formatGroup(grp, verse)}</h4>;
          }
          case "p": {
            return <p {...grp.attrs}>{formatGroup(grp, verse)}</p>;
          }
          case "em": {
            return <em {...grp.attrs}>{formatGroup(grp, verse)}</em>;
          }
          case "DD": {
            return <dd {...grp.attrs}>{formatGroup(grp, verse)}</dd>;
          }
          case "FIGURE": {
            return <figure {...grp.attrs}>{formatGroup(grp, verse)}</figure>;
          }
          case "DIV": {
            return <div {...grp.attrs}>{formatGroup(grp, verse)}</div>;
          }
          case "OL": {
            return <ol {...grp.attrs}>{formatGroup(grp, verse)}</ol>;
          }
          case "FIGCAPTION":
          case "figcaption": {
            return (
              <figcaption {...grp.attrs}>{formatGroup(grp, verse)}</figcaption>
            );
          }
          case "SPAN":
          case "span": {
            return <span {...grp.attrs}>{formatGroup(grp, verse)}</span>;
          }
          case "A":
          case "a": {
            return renderLinks(grp, verse);
          }
          case "i": {
            return <i {...grp.attrs}>{formatGroup(grp, verse)}</i>;
          }
          case "cite": {
            return <cite {...grp.attrs}>{formatGroup(grp, verse)}</cite>;
          }
          case "br": {
            return (
              <h1 {...grp.attrs}>
                {grp.grps ? grp.grps.length : "br"}
                <br />
              </h1>
            );
            // return <br {...grp.attrs}>{formatGroup(grp, verse)}</br>;
          }

          case "IMG": {
            const attrs = grp.attrs as ImgAttr;
            attrs.src = `/images/${attrs.src}.jpg`;
            return (
              <div className="img-container ">
                <img {...attrs} />
              </div>
            );
          }

          default: {
            return <span {...grp.attrs}>{formatGroup(grp, verse)}</span>;
          }
        }
      } else if (grpTxt.docType === 5 && verse) {
        const txt = grpTxt as FormatText;
        if (txt.formatMerged) {
          return (
            <span off-ets={txt.offsets}>
              {txt.formatMerged.map(fm => {
                return <span className="f-t">{fm.text}</span>;
              })}
            </span>
          );
        }
      }
    });
  }

  return;
}

const ChapterParent: NextPage<{ a: string; chapter: Chapter }> = ({
  a,
  chapter
}) => {
  // const router = useRouter();
  // console.log(router.query);
  // console.log(chapter);
  return (
    <div>
      <Head>
        <title>{chapter.title}</title>
      </Head>
      <Layout title={chapter.title} shortTitle={chapter.shortTitle}>
        <ChapterComponent chapter={chapter} />
        {formatGroups(chapter.body.grps)}
        <VerseNotesShellComponent
          verseNotes={chapter.verseNotes}
        ></VerseNotesShellComponent>
      </Layout>
    </div>
  );
};

ChapterParent.getInitialProps = async ({ query }) => {
  const a = "oiasjdf55555oiajsdf";
  const data = await axios.get(
    `/scripture_files/eng-${query["book"]}-${query["chapter"]}-chapter.json`,
    { proxy: { port: 3000, host: "127.0.0.1" } }
  );
  const chapter = (await data.data) as Chapter;
  const b = await addVersesToBody(chapter)
    .pipe(
      map(() => buildNewShell(chapter)),
      flatMap(o => o)
    )
    .toPromise();
  // console.log(chapter);

  return { a, chapter };
};

export default ChapterParent;

function renderLinks(grp: FormatGroup, verse: Verse): JSX.Element {
  const attrs = grp.attrs as { href: string };

  if (attrs.href && attrs.href.includes("#note")) {
    return <span {...grp.attrs}>{formatGroup(grp, verse)}</span>;
  }

  return (
    <Link {...attrs}>
      <a>{formatGroup(grp, verse)}</a>
    </Link>
  );
}

function renderBody(chapter: Chapter) {
  return (
    <div className="">
      <div className="chapter-content">
        <div className="chapter-loader"></div>
      </div>
    </div>
  );
}

store.chapter$.pipe(filter(o => o !== undefined)).toPromise();
