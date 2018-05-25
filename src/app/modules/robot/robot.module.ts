import { NgModule } from '@angular/core';
import { RobotComponent } from './robot.component';
import { RobotRoutes } from './robot.routes';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../sheard/shared.module';
@NgModule({
  declarations: [RobotComponent],

  imports: [RouterModule.forChild(RobotRoutes), SharedModule],
})
export class RobotModule {}
