import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsulinLogPageRoutingModule } from './insulin-log-routing.module';

import { InsulinLogPage } from './insulin-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsulinLogPageRoutingModule
  ],
  declarations: [InsulinLogPage]
})
export class InsulinLogPageModule {}
