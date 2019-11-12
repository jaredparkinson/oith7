import { Injectable } from '@angular/core';
import { FormatMerged } from '../../../../oith-lib/src/models/Chapter';
import { of, EMPTY, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { filter, map, flatMap, toArray, first, delay } from 'rxjs/operators';
import {
  VerseNoteGroup,
  FormatTagNoteOffsets,
  FormatTagType,
} from '../../../../oith-lib/src/verse-notes/verse-note';
import { scrollIntoView } from './link.service';
import { flatMap$ } from '../../../../oith-lib/src/rx/flatMap$';

@Injectable({
  providedIn: 'root',
})
export class UnderlineService {
  public selectedFormatMerged?: FormatMerged;
  public underlineOffsetTags?: FormatTagNoteOffsets[];
  constructor(private store: Store<AppState>) {}

  public underlineClick(formatMerged: FormatMerged) {
    this.store
      .select('chapter')
      .pipe(
        first(),

        filter(o => o !== undefined),
        flatMap(o => o.verseNotes),
        filter(o => o.noteGroups !== undefined),
        flatMap(o => o.noteGroups as VerseNoteGroup[]),

        map(o => {
          o.formatTag.h.next(false);
          return (o.formatTag.highlight = false);
        }),
        toArray(),
        map(o => {
          if (formatMerged === this.selectedFormatMerged) {
            if (
              this.underlineOffsetTags &&
              this.underlineOffsetTags.length > 0
            ) {
              return this.setHighlight(formatMerged);
            }
            if (!this.underlineOffsetTags) {
              this.underlineOffsetTags = formatMerged.formatTags.filter(
                f => f.fType === FormatTagType.NOTEOFFSETS,
              ) as FormatTagNoteOffsets[];

              if (this.underlineOffsetTags) {
                return this.setHighlight(formatMerged);
              }
            }
          } else {
            this.selectedFormatMerged = formatMerged;
            this.underlineOffsetTags = formatMerged.formatTags
              .filter(f => f.fType === FormatTagType.NOTEOFFSETS)
              .sort((a, b) => {
                const aO = a.offsets !== 'all' ? a.uncompressedOffsets[0] : 0;
                const bO = b.offsets !== 'all' ? b.uncompressedOffsets[0] : 0;
                return aO - bO;
              }) as FormatTagNoteOffsets[];
            return this.setHighlight(formatMerged);
          }

          this.selectedFormatMerged = undefined;
          this.underlineOffsetTags = undefined;
          return EMPTY;
        }),
      )
      .subscribe();
  }

  private setHighlight(formatMerged: FormatMerged) {
    const u = this.underlineOffsetTags.shift();

    if (u) {
      u.h.next(true);
      // formatMerged.highlight = true;
      console.log(u);
      of('verse-note-group.highlight')
        .pipe(
          delay(10),
          map(o => scrollIntoView(o)),
          flatMap$,
        )
        .subscribe();
      // scrollIntoView(``).subscribe();
    }
    return EMPTY;
  }
}
