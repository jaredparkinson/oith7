import { Component, OnInit, Input } from '@angular/core';
import { Verse } from '../../../../../oith-lib/src/models/Chapter';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: '[verse]',
  templateUrl: './verse.component.html',
  styleUrls: ['./verse.component.scss'],
})
export class VerseComponent implements OnInit {
  @Input() public verse: Verse;
  constructor(public linkService: LinkService) {}

  ngOnInit() {}
}
