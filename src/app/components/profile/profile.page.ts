import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { LogData } from 'src/app/models/log-data';
import { UpdateUserModel } from 'src/app/models/update-user-model';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnChanges {
  updatePasswordForm: FormGroup;
  updateUserForm: FormGroup;
  showUpdateUserButton = false;
  hasUpdates = false;
  isUpdatingPassword = false;
  dateOfBirth: string;
  takesInsulin: string;
  diabetesTypes: LogData[] = [
    new LogData(0, 'Prediabetes'),
    new LogData(1, 'Type 1'),
    new LogData(2, 'Type 2'),
  ];
  answers: LogData[] = [new LogData(0, 'Yes'), new LogData(1, 'No')];
  private userDetails: UserData;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges();
  }

  ngOnInit() {
    this.userDetails = this.userService.userDetails;
    this.dateOfBirth = moment(this.userDetails.dateOfBirth).format(
      'MM/DD/YYYY'
    );
    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      verifiedNewPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.updateUserForm = this.formBuilder.group({
      email: [this.userDetails.email, [Validators.required, Validators.email]],
      username: [
        this.userDetails.username,
        [Validators.required, Validators.minLength(6)],
      ],
      hasDiabetes: [this.userDetails.hasDiabetes, [Validators.required]],
      diabetesType: [this.userDetails.diabetesType, [Validators.required]],
    });
  }

  updatePassword(): void {
    if (!this.updatePasswordForm.valid) {
      this.showErrorToast('Please provide all the required values!');
    } else {
      if (
        this.updatePasswordForm.get('newPassword').value ==
        this.updatePasswordForm.get('verifiedNewPassword').value
      ) {
        this.userService
          .updatePassword(
            this.userDetails.userId,
            this.updatePasswordForm.get('newPassword').value
          )
          .subscribe(
            (response) => {
              this.isUpdatingPassword = false;
              this.showSuccessToast(response.message);
            },
            (err) => {
              this.showErrorToast(err.error.message);
            }
          );
      } else {
        this.showErrorToast('The passwords do NOT match. Please retry');
      }
    }
  }

  updatePasswordModal(): void {
    this.isUpdatingPassword = true;
  }

  onChanges(): void {
    this.updatePasswordForm.valueChanges.subscribe((val) => {
      this.showUpdateUserButton = true;
    });
  }

  async showSuccessToast(message: string) {
    await this.toastCtrl
      .create({
        message: message,
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

  updateUser(): void {
    const updatedUser = new UpdateUserModel(
      this.userDetails.userId,
      this.userDetails.firstName,
      this.userDetails.lastName,
      this.updateUserForm.get('email').value,
      this.userDetails.dateOfBirth,
      this.updateUserForm.get('username').value,
      this.userDetails.password,
      this.updateUserForm.get('hasDiabetes').value,
      this.updateUserForm.get('diabetesType').value
    );
    this.userService.updateUser(updatedUser).subscribe(
      (response) => {
        this.showSuccessToast(response.message);
        this.userService
          .getUser(this.userDetails.userId)
          .subscribe((response: UserData) => {
            this.userService.userDetails = response;
            console.log(response);
          });
      },
      (err) => {
        this.showErrorToast(err.error.message);
      }
    );
  }
}
