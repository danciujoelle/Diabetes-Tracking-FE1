import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'predict-diabetes',
    loadChildren: () =>
      import('./components/predict-diabetes/predict-diabetes.module').then(
        (m) => m.PredictDiabetesPageModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then(
        (m) => m.CalendarPageModule
      ),
  },  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'glucose-log',
    loadChildren: () => import('./components/glucose-log/glucose-log.module').then( m => m.GlucoseLogPageModule)
  },
  {
    path: 'insulin-log',
    loadChildren: () => import('./components/insulin-log/insulin-log.module').then( m => m.InsulinLogPageModule)
  },
  {
    path: 'sport-log',
    loadChildren: () => import('./components/sport-log/sport-log.module').then( m => m.SportLogPageModule)
  },
  {
    path: 'history-logs',
    loadChildren: () => import('./components/history-logs/history-logs.module').then( m => m.HistoryLogsPageModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./components/charts/charts.module').then( m => m.ChartsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
