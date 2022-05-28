import { Component, OnInit } from '@angular/core';
import { GlucoseLogModel } from 'src/app/models/glucose-log-model';
import { LogData } from 'src/app/models/log-data';
import { UserData } from 'src/app/models/user-data';
import { GlucoseLogService } from 'src/services/glucose-log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-glucose-log',
  templateUrl: './glucose-log.page.html',
  styleUrls: ['./glucose-log.page.scss'],
})
export class GlucoseLogPage implements OnInit {
  whenWasMeasuredOptions: LogData[] = [
    new LogData(0, 'before meal'),
    new LogData(1, 'after meal'),
    new LogData(2, 'before exercise'),
    new LogData(3, 'after exercise'),
    new LogData(4, 'before bed'),
  ];
  whenWasMeasured: string;
  glucoseLevel: number;
  notes: string;
  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private glucoseLogService: GlucoseLogService
  ) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
  }

  logData(): void {
    const log = new GlucoseLogModel(
      this.glucoseLevel,
      this.whenWasMeasured,
      this.notes,
      this.userDetails.userId
    );
    this.glucoseLogService.addLog(log).subscribe((data) => {
      console.log(data);
    });
  }
}
