import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIRECTIONS } from './form-options';
import { DIRECTIONS_CLASS } from '../../modules/robot/config';
import { RobotComponent } from '../../modules/robot/robot.component';
import { NzMessageService } from 'ng-zorro-antd';
import {
  SYSTEM_NOTE,
  ROBOT_OVERFLOW,
  NOT_PLACED,
} from '../../modules/sheard/messages';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent implements OnInit {
  @ViewChild('robot') robot: ElementRef;

  form: FormGroup;
  directions = DIRECTIONS;
  directionsClass = DIRECTIONS_CLASS;
  numeric = /^(0|[1-9][0-9]*)$/;
  robotSize = this.robotComponent.robotSize;
  playground = this.robotComponent.playground;
  note = SYSTEM_NOTE;
  constructor(
    private fb: FormBuilder,
    private robotComponent: RobotComponent,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      positionX: [
        null,
        [Validators.required, Validators.pattern(this.numeric)],
      ],
      positionY: [
        null,
        [Validators.required, Validators.pattern(this.numeric)],
      ],
      direction: [null, [Validators.required]],
    });
  }

  /**
   * Turn robot left based on
   * the current dierction.
   */
  turnLeft(): void {
    if (this.robotComponent.placed) {
      const face = this.robotComponent.face;
      const direction = this.directionsClass;
      switch (face) {
        case direction.north:
          this.robotComponent.face = direction.west;
          break;
        case direction.south:
          this.robotComponent.face = direction.east;
          break;
        case direction.east:
          this.robotComponent.face = direction.north;
          break;
        case direction.west:
          this.robotComponent.face = direction.south;
          break;
      }
    }
  }

  /**
   * Turn robot right based on
   * the current dierction.
   */
  turnRight(): void {
    if (this.robotComponent.placed) {
      const face = this.robotComponent.face;
      const direction = this.directionsClass;
      switch (face) {
        case direction.north:
          this.robotComponent.face = direction.east;
          break;
        case direction.south:
          this.robotComponent.face = direction.west;
          break;
        case direction.east:
          this.robotComponent.face = direction.south;
          break;
        case direction.west:
          this.robotComponent.face = direction.north;
          break;
      }
    }
  }

  /**
   * Move the robot based on
   * the current dierction.
   */
  move(): void {
    if (this.robotComponent.placed) {
      const face = this.robotComponent.face;
      const direction = this.directionsClass;
      const robotSize = this.robotSize;
      let movement;
      switch (face) {
        case direction.north:
          movement = this.robotComponent.fromTop - robotSize;
          this.isValidMove(movement)
            ? (this.robotComponent.fromTop = movement)
            : this.inform('warning');
          break;
        case direction.south:
          movement = this.robotComponent.fromTop + robotSize;
          this.isValidMove(movement)
            ? (this.robotComponent.fromTop = movement)
            : this.inform('warning');
          break;
        case direction.east:
          movement = this.robotComponent.fromLeft + robotSize;
          this.isValidMove(movement)
            ? (this.robotComponent.fromLeft = movement)
            : this.inform('warning');
          break;
        case direction.west:
          movement = this.robotComponent.fromLeft - robotSize;
          this.isValidMove(movement)
            ? (this.robotComponent.fromLeft = movement)
            : this.inform('warning');
          break;
      }
    }
  }

  /**
   * Validate if the robot able to move .
   */
  isValidMove(movement): boolean {
    const minMove = 0;
    const maxMove = this.playground - this.robotSize;
    return movement >= minMove && movement <= maxMove;
  }

  /**
   * Inform the user whats robot trying to say.
   * @param type of the message.
   */
  inform(type: string): void {
    this.message.create(type, ROBOT_OVERFLOW);
  }

  /**
   * Show curent robot state.
   * inform the user robot position & direction.
   */
  report() {
    const placed = this.robotComponent.placed;
    if (placed) {
      const face = this.robotComponent.face.replace(/-/g, ' ');
      const column = this.robotComponent.fromLeft / this.robotSize + 1;
      const row = this.robotComponent.fromTop / this.robotSize + 1;
      this.message.create(
        'success',
        `Robot standing on row ${row} , column ${column} and his ${face}`,
      );
    } else {
      this.message.create('warning', NOT_PLACED);
    }
  }

  /**
   * Initialize the robot
   * & validate the values
   */
  init() {
    const x = Number(this.form.controls.positionX.value) + 1;
    const y = Number(this.form.controls.positionY.value) + 1;
    const d = `face-to-${this.form.controls.direction.value}`;
    this.isValidMove(x * this.robotSize - this.robotSize) &&
    this.isValidMove(y * this.robotSize - this.robotSize)
      ? this.robotComponent.place(x, y, d)
      : this.inform('warning');
  }

  /**
   * Remove the robot
   */
  remove() {
    this.robotComponent.placed = false;
  }
}
