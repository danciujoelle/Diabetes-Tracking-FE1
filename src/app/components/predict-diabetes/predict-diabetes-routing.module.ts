import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictDiabetesPage } from './predict-diabetes.page';

const routes: Routes = [
  {
    path: '',
    component: PredictDiabetesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictDiabetesPageRoutingModule {}
