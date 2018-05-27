import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIRECTIONS } from './form-options';
import { DIRECTIONS_CLASS } from '../../modules/robot/config';
import { RobotComponent } from '../../modules/robot/robot.component';
import { NzMessageService } from 'ng-zorro-antd';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { ParserService } from '../../services/parser.service';
import { FormService } from '../../services/form.service';
import {
  SYSTEM_NOTE,
  ROBOT_OVERFLOW,
  NOT_PLACED,
  NO_DATA,
  MULTI_COMMAND_PLACE_HOLDER,
  NOT_VALID_COMMAND,
} from '../../modules/sheard/messages';
import { Location } from './types';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
  providers: [ParserService, FormService],
})
export class ControlComponent implements OnInit {
  @Output() submit = new EventEmitter();

  form: FormGroup;
  script: FormGroup;
  directions = DIRECTIONS;
  directionsClass = DIRECTIONS_CLASS;
  numeric = /^(0|[1-9][0-9]*)$/;
  robotSize = this.robotComponent.robotSize;
  playground = this.robotComponent.playground;
  note = SYSTEM_NOTE;
  commands = [];
  MULTI_COMMAND_PLACE_HOLDER = MULTI_COMMAND_PLACE_HOLDER;
  constructor(
    private fb: FormBuilder,
    private robotComponent: RobotComponent,
    private message: NzMessageService,
    private parserService: ParserService,
    private formService: FormService,
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

    this.script = this.fb.group({
      text: [null, [Validators.required]],
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
   * Validate if the robot able to move.
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
  report(): void {
    const placed = this.robotComponent.placed;
    if (placed) {
      const { face, row, column } = this.locate();
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
   * & validate the values.
   */
  init(): void {
    const x = Number(this.form.controls.positionX.value) + 1;
    const y = Number(this.form.controls.positionY.value) + 1;
    const d = `face-to-${this.form.controls.direction.value}`;
    this.isValidMove(x * this.robotSize - this.robotSize) &&
    this.isValidMove(y * this.robotSize - this.robotSize)
      ? this.robotComponent.place(x, y, d)
      : this.inform('warning');
  }

  /**
   * Remove the robot.
   */
  remove(): void {
    this.robotComponent.placed = false;
  }

  /**
   * Command issuer.
   */

  issue(command: string): void {
    const placed = this.robotComponent.placed;
    const face = this.robotComponent.face.split('-');
    const index = 2;
    if (command === 'move' && placed) {
      this.move();
      this.log(`One step to ${face[index]}.`);
    } else if (command === 'right' && placed) {
      this.turnRight();
      this.log(`Turn right.`);
    } else if (command === 'left' && placed) {
      this.turnLeft();
      this.log(`Turn left.`);
    } else if (command === 'remove' && placed) {
      this.remove();
      this.log(`User removed the robot.`);
    } else if (command === 'place') {
      const { positionX, positionY, direction } = this.formService.fetchData(
        this.form.controls,
      );
      this.init();
      this.log(
        `User placed the robot in row ${positionX} column ${positionY} and face to ${direction}.`,
      );
    }
  }

  /**
   * Movments logger.
   */
  log(move) {
    this.commands.push({ actions: move });
  }

  /**
   * Get robot location.
   */
  locate(): Location {
    const face = this.robotComponent.face.replace(/-/g, ' ');
    const column = this.robotComponent.fromLeft / this.robotSize;
    const row =
      (this.robotComponent.playground - this.robotComponent.fromTop) /
        this.robotSize -
      1;
    return { face, column, row };
  }

  /**
   * Download actions report.
   */
  results() {
    const data = this.commands;
    if (data.length > 0) {
      const results = new Angular5Csv(data, 'Results');
    } else {
      this.message.create('warning', NO_DATA);
    }
    this.wipe();
  }

  /**
   * Clear user logger.
   */
  wipe() {
    this.commands = [];
  }

  /**
   * Multi command issuer parser,
   * parse text into functions.
   */
  multi() {
    const value = this.script.controls.text.value.split(/\n/);
    value.forEach((text, index) => {
      const command = this.parserService.parse(text);
      if (command && command.type) {
        setTimeout(() => {
          this.sendComand(command);
        }, 1000 * index);
      }
    });
  }

  /**
   * Check command type and fire the issuer
   * @param command
   */
  sendComand(command) {
    if (command.type === 'invalid') {
      this.message.create('error', NOT_VALID_COMMAND);
    } else if (
      command.type === 'place' &&
      command.row &&
      command.column &&
      command.direction
    ) {
      this.form.controls.positionX.setValue(command.row);
      this.form.controls.positionY.setValue(command.column);
      this.form.controls.direction.setValue(command.direction);
      this.issue(command.type);
    } else if (command.type === 'report') {
      this.report();
    } else {
      this.issue(command.type);
    }
  }
}
