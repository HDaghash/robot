import { Routes } from '@angular/router';
import { ROBOT_COMPONENT_ROUTE } from '../../core/config/routes';
import { RobotComponent } from './robot.component';

export const RobotRoutes: Routes = [
  {
    path: ROBOT_COMPONENT_ROUTE,
    component: RobotComponent,
  },
];
