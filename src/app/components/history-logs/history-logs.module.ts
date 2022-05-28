import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryLogsPageRoutingModule } from './history-logs-routing.module';

import { HistoryLogsPage } from './history-logs.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgApexchartsModule,
    HistoryLogsPageRoutingModule,
  ],
  declarations: [HistoryLogsPage],
})
export class HistoryLogsPageModule {}
