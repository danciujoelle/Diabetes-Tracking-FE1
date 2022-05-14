import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredictDiabetesPageRoutingModule } from './predict-diabetes-routing.module';

import { PredictDiabetesPage } from './predict-diabetes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredictDiabetesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PredictDiabetesPage]
})
export class PredictDiabetesPageModule {}
