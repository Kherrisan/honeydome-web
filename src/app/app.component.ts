import {Component, OnInit} from '@angular/core';
import {DefaultService} from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Honeydome-Web';
  isCollapsed = true;
  hasLogin = false;

  constructor(private tap: DefaultService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.tap.tap().toPromise();
      this.hasLogin = true;
    } catch (e) {
      this.hasLogin = false;
    }
  }
}
