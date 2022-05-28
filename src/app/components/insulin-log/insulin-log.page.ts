import { Component, OnInit } from '@angular/core';
import { InsulinLogModel } from 'src/app/models/insulin-log-model';
import { LogData } from 'src/app/models/log-data';
import { UserData } from 'src/app/models/user-data';
import { InsulinLogService } from 'src/services/insulin-log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-insulin-log',
  templateUrl: './insulin-log.page.html',
  styleUrls: ['./insulin-log.page.scss'],
})
export class InsulinLogPage implements OnInit {
  whenWasMeasuredOptions: LogData[] = [
    new LogData(0, 'before meal'),
    new LogData(1, 'after meal'),
  ];
  whenWasInjected: string;
  insulinIntake: number;
  notes: string;
  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private insulinLogService: InsulinLogService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
  }

  logData(): void {
    const log = new InsulinLogModel(
      this.insulinIntake,
      this.whenWasInjected,
      this.notes,
      this.userDetails.userId
    );
    this.insulinLogService.addLog(log).subscribe((data) => {
      console.log(data);
    });
  }
}
