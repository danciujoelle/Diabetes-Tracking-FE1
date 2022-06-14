import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private sportLogService: SportLogService,
    private toastCtrl: ToastController,
    private route: Router
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
    this.sportLogService.addLog(log).subscribe(
      (data) => {
        this.showSuccessToast();
        this.route.navigate(['/home']);
      },
      (err) => {
        this.showErrorToast(err.error.message);
      }
    );
  }

  async showSuccessToast() {
    await this.toastCtrl
      .create({
        message: 'You have successfully logged your activity',
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
    return this.activity != null && this.duration != 0;
  }
}
