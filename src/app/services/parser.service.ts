import { Injectable } from '@angular/core';
import { DIRECTIONS } from '../components/control/form-options';
import { NzBreadCrumbComponent } from 'ng-zorro-antd';

@Injectable()
export class ParserService {
  constructor() {}
  private directions = DIRECTIONS;
  parse(script) {
    if (script && script.trim() !== '') {
      const paramIndex = 1;
      const rowIndex = 0;
      const colIndex = 1;
      const directionIndex = 2;
      const value = script.toLowerCase();
      if (value.includes('place')) {
        const params = value.split(' ')[paramIndex];
        const row = params ? params.split(',')[rowIndex] : null;
        const column = params ? params.split(',')[colIndex] : null;
        const direction = params ? params.split(',')[directionIndex] : null;
        if (
          this.isNumber(row) &&
          this.isNumber(column) &&
          this.isValidDirection(direction)
        ) {
          return { type: 'place', row, column, direction };
        } else {
          return { type: 'invalid' };
        }
      } else if (value.includes('move') && value !== 'remove') {
        return { type: 'move' };
      } else if (value.includes('left')) {
        return { type: 'left' };
      } else if (value.includes('right')) {
        return { type: 'right' };
      } else if (value.includes('remove')) {
        return { type: 'remove' };
      } else if (value.includes('report')) {
        return { type: 'report' };
      } else {
        return { type: 'invalid' };
      }
    }
  }

  isValidDirection(direction) {
    const compare = direction.trim().toLowerCase();
    for (let x = 0; this.directions.length > x; x++) {
      if (this.directions[x].value === compare) {
        return true;
      }
    }
    return false;
  }

  isNumber(n) {
    return !isNaN(Number(n));
  }
}
