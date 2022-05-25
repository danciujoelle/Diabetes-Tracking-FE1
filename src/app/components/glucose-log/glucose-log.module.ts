import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlucoseLogPageRoutingModule } from './glucose-log-routing.module';

import { GlucoseLogPage } from './glucose-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlucoseLogPageRoutingModule
  ],
  declarations: [GlucoseLogPage]
})
export class GlucoseLogPageModule {}
