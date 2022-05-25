import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlucoseLogPage } from './glucose-log.page';

const routes: Routes = [
  {
    path: '',
    component: GlucoseLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlucoseLogPageRoutingModule {}
