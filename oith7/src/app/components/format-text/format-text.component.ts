import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormatText,
  FormatMerged,
} from '../../../../../oith-lib/src/models/Chapter';
import {
  FormatTagType,
  FormatTagNoteOffsets,
} from '../../../../../oith-lib/src/verse-notes/verse-note';
import { UnderlineService } from 'src/app/services/underline.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NoteSettingsService } from 'src/app/services/note-settings.service';

@Component({
  selector: '[format-text]',
  templateUrl: './format-text.component.html',
  styleUrls: ['./format-text.component.scss'],
})
export class FormatTextComponent implements OnInit, OnDestroy {
  public ngOnDestroy(): void {
    if (this.highlights$) {
      // this.highlights$.unsubscribe();
    }
  }
  @Input() public formatText: FormatText;
  public underline = false;
  public doubleUnderline = false;
  public highlights$?: Subscription;
  constructor(
    public underlineService: UnderlineService,
    public noteSettingsService: NoteSettingsService,
  ) {}

  public ngOnInit() {
    this.reset();
    this.setupHighlight();

    this.noteSettingsService.resetUnderline$.subscribe(() => {
      this.reset();
    });
  }
  private reset() {
    if (this.formatText.formatMerged) {
      // const underlineCount = this.formatText.formatMerged.filter(o=> o.formatTags.)
      this.formatText.formatMerged.map(fm => {
        const u = fm.formatTags.filter(
          f => f.visible && f.fType === FormatTagType.NOTEOFFSETS,
        );
        fm.underline = false;
        fm.doubleUnderline = false;
        fm.highlight = false;

        fm.all = fm.formatTags.find(f => f.offsets === 'all') !== undefined;
        if (u.length === 1) {
          fm.underline = true;
        } else if (u.length > 1) {
          fm.doubleUnderline = true;
        }
      });
    }
  }

  private setupHighlight() {
    this.formatText.formatMerged.map(fM => {
      const highlights$ = fM.formatTags
        .filter(fT => fT.fType === FormatTagType.NOTEOFFSETS)
        .map((fT: FormatTagNoteOffsets) => {
          return fT.h;
        })
        .filter(ft => ft !== undefined);
      this.highlights$ = combineLatest(highlights$).subscribe(
        o => (fM.highlight = o.includes(true)),
      );
    });
  }

  public click(formatMerged: FormatMerged) {
    this.underlineService.underlineClick(formatMerged);
  }
}
