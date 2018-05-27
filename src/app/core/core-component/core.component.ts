import {
  Component,
  OnInit,
  AfterViewInit,
  ContentChildren,
} from '@angular/core';
import { ContentChild } from '@angular/core';
@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
})
export class CoreComponent {
  isCollapsed = false;
  isReverseArrow = true;
  width = 200;

  constructor() {}
}
