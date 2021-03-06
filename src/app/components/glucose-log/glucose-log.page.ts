import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  ];
  whenWasMeasured: string;
  glucoseLevel: number;
  notes: string;
  private userDetails: UserData;

  constructor(
    private userService: UserService,
    private glucoseLogService: GlucoseLogService,
    private route: Router,
    private toastCtrl: ToastController
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
    this.glucoseLogService.addLog(log).subscribe(
      (data) => {
        if (
          data.message ==
          'Glucose level is over the normal range. Please contact the doctor!'
        ) {
          this.showErrorToast(data.message);
        } else {
          this.showSuccessToast(data.message);
        }
        this.route.navigate(['/home']);
      },
      (err) => {
        this.showErrorToast(err.error.message);
      }
    );
  }

  async showSuccessToast(messageToShow: string) {
    await this.toastCtrl
      .create({
        message: messageToShow,
        duration: 5000,
        color: 'success',
        buttons: [
          {
            text: 'OK',
          },
        ],
      })
      .then((res) => res.present());
  }

  async showErrorToast(error: string) {
    await this.toastCtrl
      .create({
        message: error,
        color: 'danger',
        buttons: [
          {
            text: 'OK',
          },
        ],
      })
      .then((res) => res.present());
  }

  showButton(): boolean {
    return this.glucoseLevel != 0 && this.whenWasMeasured != null;
  }
}
