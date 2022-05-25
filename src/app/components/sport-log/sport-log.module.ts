import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportLogPageRoutingModule } from './sport-log-routing.module';

import { SportLogPage } from './sport-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportLogPageRoutingModule
  ],
  declarations: [SportLogPage]
})
export class SportLogPageModule {}
