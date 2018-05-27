import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DIRECTIONS_CLASS } from './config';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css'],
})
export class RobotComponent implements OnInit {
  @ViewChild('robot') robot: ElementRef;
  directionsClass = DIRECTIONS_CLASS;
  face: string = this.directionsClass.north;
  fromLeft = 320;
  fromTop = 320;
  playground = 400;
  columns = 5;
  rows = 5;
  name;
  robotSize = this.playground / this.columns;
  placed = false;
  constructor() {}

  ngOnInit() {}

  /**
   * Place robot on playground
   * @param x row number.
   * @param y column number.
   * @param d dirction.
   */
  place(x, y, face, name?) {
    this.name = name || 'Mr.Robot';
    this.face = face;
    this.fromLeft = y * this.robotSize - this.robotSize;
    this.fromTop = this.playground - this.robotSize * x;
    this.placed = true;
  }

  issue(command) {
    console.log('command issued ..');
  }
}
