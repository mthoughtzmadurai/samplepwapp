import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PrivacyPolicyComponent implements OnInit {
  appName: string;

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.appName = this.app.title;
  }

}
