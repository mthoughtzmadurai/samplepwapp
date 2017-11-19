import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CardComponent implements OnInit {
  @Input() architect;

  constructor() {}

  ngOnInit() {

  }
}
