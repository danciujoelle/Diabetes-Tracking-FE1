import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportLogPage } from './sport-log.page';

const routes: Routes = [
  {
    path: '',
    component: SportLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportLogPageRoutingModule {}
