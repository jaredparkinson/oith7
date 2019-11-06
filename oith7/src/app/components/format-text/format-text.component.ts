import { Component, OnInit, Input } from '@angular/core';
import { FormatText } from '../../../../../oith-lib/src/models/Chapter';

@Component({
  selector: '[format-text]',
  templateUrl: './format-text.component.html',
  styleUrls: ['./format-text.component.scss'],
})
export class FormatTextComponent implements OnInit {
  @Input() public formatText: FormatText;
  constructor() {}

  ngOnInit() {}
}
