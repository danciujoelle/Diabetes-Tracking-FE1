import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private userDetails: UserData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
  }

  closeModal() {}
}
