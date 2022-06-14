import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { UserData } from 'src/app/models/user-data';
import { GlucoseLogService } from 'src/services/glucose-log.service';
import { InsulinLogService } from 'src/services/insulin-log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  loggedUser: UserData;
  glucoseReminder: string;
  insulinReminder: string;
  options;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private glucoseService: GlucoseLogService,
    private insulinService: InsulinLogService
  ) {}

  ionViewWillEnter(): void {
    this.setGlucoseReminder();
    this.setInsulinReminder();
  }

  ngOnInit() {
    this.loggedUser = this.userService.userDetails;
    this.options = [
      {
        img: 'assets/imgs/diabetes.png',
        name: 'Predict diabetes',
        route: '/predict-diabetes',
      },
      {
        img: 'assets/imgs/report.png',
        name: 'Log History',
        route: '/history-logs',
      },
      {
        img: 'assets/imgs/charts.png',
        name: 'Charts',
        route: '/charts',
      },
      {
        img: 'assets/imgs/glucose-meter.png',
        name: 'Blood glucose tracker',
        route: '/glucose-log',
      },
      {
        img: 'assets/imgs/insulin.png',
        name: 'Insulin injection',
        route: '/insulin-log',
      },
      {
        img: 'assets/imgs/sport.png',
        name: 'Log sport',
        route: '/sport-log',
      },
      {
        img: 'assets/imgs/calendar.png',
        name: 'Add medical appointments',
        route: '/calendar',
      },
    ];

    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loggedUser = this.router.getCurrentNavigation().extras.state.user;
      }
    });

    this.setGlucoseReminder();
    this.setInsulinReminder();
  }

  private setGlucoseReminder(): void {
    this.glucoseService
      .needsReminder(this.loggedUser.userId)
      .subscribe((response: boolean) => {
        console.log(response);
        if (response == true) {
          this.glucoseReminder = "You haven't logged your glucose level today!";
        } else {
          this.glucoseReminder = null;
        }
      });
  }

  private setInsulinReminder(): void {
    this.insulinService
      .needsReminder(this.loggedUser.userId)
      .subscribe((response: boolean) => {
        if (response == true) {
          this.insulinReminder =
            "You haven't logged your insulin injection today!";
        } else {
          this.glucoseReminder = null;
        }
      });
  }
}
