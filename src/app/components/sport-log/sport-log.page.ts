import { Component, OnInit } from '@angular/core';
import { LogData } from 'src/app/models/log-data';
import { SportLogModel } from 'src/app/models/sport-log-model';
import { UserData } from 'src/app/models/user-data';
import { SportLogService } from 'src/services/sport-log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sport-log',
  templateUrl: './sport-log.page.html',
  styleUrls: ['./sport-log.page.scss'],
})
export class SportLogPage implements OnInit {
  duration: number;
  activityOptions: LogData[] = [
    new LogData(0, 'walk'),
    new LogData(1, 'run'),
    new LogData(2, 'gym class'),
    new LogData(3, 'swim'),
  ];
  activity: string;
  notes: string;

  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private sportLogService: SportLogService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
  }

  logData(): void {
    const log = new SportLogModel(
      this.duration,
      this.activity,
      this.notes,
      this.userDetails.userId
    );
    this.sportLogService.addLog(log).subscribe((data) => {
      console.log(data);
    });
  }
}
