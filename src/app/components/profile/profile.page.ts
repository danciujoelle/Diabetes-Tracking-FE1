import { Component, OnInit } from '@angular/core';
import { LogData } from 'src/app/models/log-data';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  hasDiabetes: string;
  diabetesType: string;
  takesInsulin: string;
  diabetesTypes: LogData[] = [
    new LogData(0, 'Type 1'),
    new LogData(1, 'Type 2'),
  ];
  answers: LogData[] = [new LogData(0, 'Yes'), new LogData(1, 'No')];
  private userDetails: UserData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
  }

  closeModal() {}
}
