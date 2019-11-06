import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith-lib/src/models/Chapter';

@Component({
  selector: '[format-group]',
  templateUrl: './format-group.component.html',
  styleUrls: ['./format-group.component.scss'],
})
export class FormatGroupComponent implements OnInit {
  @Input() public formatGroup: FormatGroup;
  constructor() {}

  ngOnInit() {}
}
