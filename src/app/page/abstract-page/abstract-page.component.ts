import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-abstract-page',
  templateUrl: './abstract-page.component.html',
  styleUrls: ['./abstract-page.component.css']
})
export class AbstractPageComponent implements OnInit {

  firmbargains = ['1'];
  backtests = ['1'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
