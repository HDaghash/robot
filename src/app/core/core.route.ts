import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import {
  ROBOT_MOUDLE_ROUTE,
  ROUTE_404,
  ROBOT_COMPONENT_ROUTE,
} from './config/routes';
import { CoreComponent } from './core-component/core.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: ROBOT_COMPONENT_ROUTE,
    pathMatch: 'full',
  },
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        loadChildren: ROBOT_MOUDLE_ROUTE,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTE_404,
  },
];
