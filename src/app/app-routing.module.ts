import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./components/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'predict-diabetes',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/predict-diabetes/predict-diabetes.module').then(
        (m) => m.PredictDiabetesPageModule
      ),
  },
  {
    path: 'calendar',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/calendar/calendar.module').then(
        (m) => m.CalendarPageModule
      ),
  },
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'glucose-log',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/glucose-log/glucose-log.module').then(
        (m) => m.GlucoseLogPageModule
      ),
  },
  {
    path: 'insulin-log',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/insulin-log/insulin-log.module').then(
        (m) => m.InsulinLogPageModule
      ),
  },
  {
    path: 'sport-log',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/sport-log/sport-log.module').then(
        (m) => m.SportLogPageModule
      ),
  },
  {
    path: 'history-logs',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/history-logs/history-logs.module').then(
        (m) => m.HistoryLogsPageModule
      ),
  },
  {
    path: 'charts',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/charts/charts.module').then(
        (m) => m.ChartsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
