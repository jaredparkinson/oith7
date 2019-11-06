import { Component, OnInit, Input } from '@angular/core';
import { FormatGroup } from '../../../../../oith-lib/src/models/Chapter';

@Component({
  selector: '[format-groups]',
  templateUrl: './format-groups.component.html',
  styleUrls: ['./format-groups.component.scss'],
})
export class FormatGroupsComponent implements OnInit {
  @Input() public formatGroups: FormatGroup;
  constructor() {}

  ngOnInit() {}
}
