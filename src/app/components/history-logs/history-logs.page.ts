import { Component, OnInit } from '@angular/core';
import { GlucoseLogData } from 'src/app/models/glucose-log-data';
import { InsulinLogData } from 'src/app/models/insulin-log-data';
import { SportLogData } from 'src/app/models/sport-data';
import { UserData } from 'src/app/models/user-data';
import { GlucoseLogService } from 'src/services/glucose-log.service';
import { InsulinLogService } from 'src/services/insulin-log.service';
import { SportLogService } from 'src/services/sport-log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-history-logs',
  templateUrl: './history-logs.page.html',
  styleUrls: ['./history-logs.page.scss'],
})
export class HistoryLogsPage implements OnInit {
  isGlucoseHistory = true;
  isInsulinHistory = false;
  isSportHistory = false;

  private glucoseLogs: Array<GlucoseLogData> = new Array<GlucoseLogData>();
  private insulinLogs: Array<InsulinLogData> = new Array<InsulinLogData>();
  private sportLogs: Array<SportLogData> = new Array<SportLogData>();
  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private glucoseLogService: GlucoseLogService,
    private insulinLogService: InsulinLogService,
    private sportLogService: SportLogService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
    this.setGlucoseLogs();
    this.setInsulinLogs();
    this.setSportLogs();
  }

  seeGlucoseHistory(): void {
    this.isInsulinHistory = false;
    this.isSportHistory = false;
    this.isGlucoseHistory = true;
  }

  seeInsulinHistory(): void {
    this.isInsulinHistory = true;
    this.isSportHistory = false;
    this.isGlucoseHistory = false;
  }

  seeSportHistory(): void {
    this.isInsulinHistory = false;
    this.isSportHistory = true;
    this.isGlucoseHistory = false;
  }

  private setGlucoseLogs(): void {
    this.glucoseLogService
      .getLogs(this.userDetails.userId)
      .subscribe((data: Array<GlucoseLogData>) => {
        data.forEach((log) => {
          this.glucoseLogs.push(log);
        });
      });
  }

  private setInsulinLogs(): void {
    this.insulinLogService
      .getLogs(this.userDetails.userId)
      .subscribe((data: Array<InsulinLogData>) => {
        data.forEach((log) => {
          this.insulinLogs.push(log);
        });
      });
  }

  private setSportLogs(): void {
    this.sportLogService
      .getLogs(this.userDetails.userId)
      .subscribe((data: Array<SportLogData>) => {
        data.forEach((log) => {
          this.sportLogs.push(log);
        });
      });
  }
}
