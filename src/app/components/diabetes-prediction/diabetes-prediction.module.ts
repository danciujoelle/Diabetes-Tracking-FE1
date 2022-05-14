import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiabetesPredictionPageRoutingModule } from './diabetes-prediction-routing.module';

import { DiabetesPredictionPage } from './diabetes-prediction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiabetesPredictionPageRoutingModule
  ],
  declarations: [DiabetesPredictionPage]
})
export class DiabetesPredictionPageModule {}
