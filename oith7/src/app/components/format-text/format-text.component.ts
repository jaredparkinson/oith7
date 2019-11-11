import { Component, OnInit, Input } from '@angular/core';
import {
  FormatText,
  FormatMerged,
} from '../../../../../oith-lib/src/models/Chapter';
import {
  FormatTagType,
  FormatTagNoteOffsets,
} from '../../../../../oith-lib/src/verse-notes/verse-note';
import { UnderlineService } from 'src/app/services/underline.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: '[format-text]',
  templateUrl: './format-text.component.html',
  styleUrls: ['./format-text.component.scss'],
})
export class FormatTextComponent implements OnInit {
  @Input() public formatText: FormatText;
  public underline = false;
  public doubleUnderline = false;
  constructor(public underlineService: UnderlineService) {}

  public ngOnInit() {
    if (this.formatText.formatMerged) {
      // const underlineCount = this.formatText.formatMerged.filter(o=> o.formatTags.)
      this.formatText.formatMerged.map(fm => {
        const u = fm.formatTags.filter(
          f => f.fType === FormatTagType.NOTEOFFSETS && f.offsets !== 'all',
        );

        fm.all = fm.formatTags.find(f => f.offsets === 'all') !== undefined;
        console.log(fm.all);

        if (u.length === 1) {
          fm.underline = true;
        } else if (u.length > 1) {
          fm.doubleUnderline = true;
        }
      });

      this.formatText.formatMerged.map(fM => {
        const highlights$ = fM.formatTags
          .filter(fT => fT.fType === FormatTagType.NOTEOFFSETS)
          .map((fT: FormatTagNoteOffsets) => {
            return fT.h;
          })
          .filter(ft => ft !== undefined);
        combineLatest(highlights$).subscribe(
          o => (fM.highlight = o.includes(true)),
        );
      });
    }
  }
  public click(formatMerged: FormatMerged) {
    this.underlineService.underlineClick(formatMerged);
  }
}
