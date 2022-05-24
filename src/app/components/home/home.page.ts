import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUser: UserData;
  options;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loggedUser = this.userService.userDetails;
    this.options = [
      {
        img: 'assets/imgs/predict_diabetes.png',
        name: 'Predict diabetes',
        route: '/predict-diabetes',
      },
      {
        img: 'assets/imgs/glucose.png',
        name: 'Blood glucose tracker',
        route: '/glucose-tracker',
      },
      {
        img: 'assets/imgs/insulin.png',
        name: 'Insulin injection',
        route: '/insulin-intake',
      },
      {
        img: 'assets/imgs/sport.png',
        name: 'Log sport',
        route: '/log-sport',
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
  }
}
