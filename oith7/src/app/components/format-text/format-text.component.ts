import { Component, OnInit, Input } from '@angular/core';
import {
  FormatText,
  FormatMerged,
} from '../../../../../oith-lib/src/models/Chapter';
import { FormatTagType } from '../../../../../oith-lib/src/verse-notes/verse-note';

@Component({
  selector: '[format-text]',
  templateUrl: './format-text.component.html',
  styleUrls: ['./format-text.component.scss'],
})
export class FormatTextComponent implements OnInit {
  @Input() public formatText: FormatText;
  public underline = false;
  public doubleUnderline = false;
  constructor() {}

  ngOnInit() {
    if (this.formatText.formatMerged) {
      // const underlineCount = this.formatText.formatMerged.filter(o=> o.formatTags.)
      this.formatText.formatMerged.map(fm => {
        const u = fm.formatTags.filter(
          f => f.fType === FormatTagType.NOTEOFFSETS,
        );
        if (u.length === 1) {
          fm.underline = true;
        } else if (u.length > 1) {
          fm.doubleUnderline = true;
        }
      });
    }
  }
  public click(formatMerged: FormatMerged) {
    console.log(formatMerged);
  }
}
