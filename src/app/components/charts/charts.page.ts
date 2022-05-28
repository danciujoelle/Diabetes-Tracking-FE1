import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { GlucoseLogData } from 'src/app/models/glucose-log-data';
import { InsulinLogData } from 'src/app/models/insulin-log-data';
import { UserData } from 'src/app/models/user-data';
import { GlucoseLogService } from 'src/services/glucose-log.service';
import { InsulinLogService } from 'src/services/insulin-log.service';
import { UserService } from 'src/services/user.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  glucose: Partial<ChartOptions>;
  insulin: Partial<ChartOptions>;
  glucoseValues: Array<number> = new Array<number>();
  insulinValues: Array<number> = new Array<number>();
  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private glucoseLogService: GlucoseLogService,
    private insulinLogService: InsulinLogService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
    this.setGlucoseValues();
    this.setInsulinValues();
    console.log(this.insulinValues);
    this.spackLine();
  }

  spackLine() {
    this.glucose = {
      series: [
        {
          name: 'Glucose Levels',
          data: this.glucoseValues,
        },
      ],
      chart: {
        type: 'area',
        height: 200,
      },
    };
    this.insulin = {
      series: [
        {
          name: 'Insulin Injections',
          data: this.insulinValues,
        },
      ],
      chart: {
        type: 'area',
        height: 200,
      },
    };
  }

  setGlucoseValues(): void {
    this.glucoseLogService
      .getLogs(this.userDetails.userId)
      .subscribe((data: Array<GlucoseLogData>) => {
        data.forEach((log) => {
          this.glucoseValues.push(log.glucoseLevel);
        });
      });
  }

  setInsulinValues(): void {
    this.insulinLogService
      .getLogs(this.userDetails.userId)
      .subscribe((data: Array<InsulinLogData>) => {
        console.log(data);
        data.forEach((log) => {
          this.insulinValues.push(log.insulinInjected);
        });
      });
  }
}
