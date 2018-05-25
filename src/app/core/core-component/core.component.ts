import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;

  constructor() {}

  ngOnInit() {}
}
