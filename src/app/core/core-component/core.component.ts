import { Component, OnInit } from '@angular/core';
import { ContentChild } from '@angular/core';
import { ControlComponent } from '../../components/control/control.component';
@Component({
  selector: 'app-core-component',
  templateUrl: './core.component.html',
  providers: [ControlComponent],
})
export class CoreComponent implements OnInit {
  // @ContentChild(ControlComponent) private controll: ControlComponent;
  isCollapsed = false;
  isReverseArrow = true;
  width = 200;

  constructor() {}

  ngOnInit() {}

  move() {
    //  this.controll.move();
  }

  // right() {
  //   this.commonService.turnRight();
  // }

  // left() {
  //   this.commonService.turnLeft();
  // }

  // report() {
  //   this.commonService.report();
  // }

  // remove() {
  //   this.commonService.remove();
  // }
}
