import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsulinLogPage } from './insulin-log.page';

const routes: Routes = [
  {
    path: '',
    component: InsulinLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsulinLogPageRoutingModule {}
