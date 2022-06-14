import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private insulinLogService: InsulinLogService,
    private toastCtrl: ToastController,
    private route: Router
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
    this.insulinLogService.addLog(log).subscribe(
      (data) => {
        this.showSuccessToast();
        this.route.navigate(['/home']);
        window.location.reload();
      },
      (err) => {
        this.showErrorToast(err.error.message);
      }
    );
  }

  async showSuccessToast() {
    await this.toastCtrl
      .create({
        message: 'You have successfully logged your insulin injection',
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
    return this.insulinIntake != 0 && this.whenWasInjected != null;
  }
}
