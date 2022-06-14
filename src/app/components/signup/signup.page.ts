/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  submitForm: FormGroup;
  todayDate = new Date();
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  get errorControl() {
    return this.submitForm.controls;
  }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getDate(e) {
    const date = new Date(e.target.value).toISOString().substring(0, 10);
    this.submitForm.get('dateOfBirth').setValue(date, {
      onlyself: true,
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.submitForm.valid) {
      this.showErrorToast('Please provide all the required values!');
    } else {
      const user = new UserModel(
        this.submitForm.get('firstName').value,
        this.submitForm.get('lastName').value,
        this.submitForm.get('email').value,
        this.submitForm.get('dateOfBirth').value,
        this.submitForm.get('username').value,
        this.submitForm.get('password').value,
        true,
        'Type 2'
      );
      this.userService.addUser(user).subscribe(
        (data) => {
          if (data.statusCode === 200) {
            this.submitForm.reset();
          }
        },
        (err) => {
          this.showErrorToast(err.error.message);
        }
      );
    }
  }

  async showSuccessToast() {
    await this.toastCtrl
      .create({
        message: 'You have successfully logged your glucose level',
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
}
