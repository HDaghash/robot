import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from '../../components/control/control.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [ControlComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlComponent,
    NgZorroAntdModule,
  ],
})
export class SharedModule {}
