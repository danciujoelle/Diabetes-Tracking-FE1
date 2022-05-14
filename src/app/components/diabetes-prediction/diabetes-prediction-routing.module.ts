import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiabetesPredictionPage } from './diabetes-prediction.page';

const routes: Routes = [
  {
    path: '',
    component: DiabetesPredictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiabetesPredictionPageRoutingModule {}
