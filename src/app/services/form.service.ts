import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormControls } from './types';
@Injectable()
export class FormService {
  constructor() {}

  /**
   * Fetch data from form
   */
  fetchData(controls: FormControls, fields?: string[]): any {
    const data = {};
    if (!fields) {
      fields = Object.keys(controls);
    }
    fields.forEach(field => {
      const control = controls[field];
      const { value } = control;
      if (
        typeof value !== 'undefined' &&
        value !== null &&
        value !== '' &&
        control instanceof FormControl
      ) {
        data[field] = value;
      }
    });

    return data;
  }
}
