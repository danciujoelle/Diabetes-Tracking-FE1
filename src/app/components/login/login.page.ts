import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserData } from 'src/app/models/user-data';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.userService.userDetails = new UserData();
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.showErrorToast('Both fields are required');
    }
    this.userService
      .verifyUser(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (response) => {
          this.userService.userDetails = response.userData;
          const navigationExtras: NavigationExtras = {
            state: {
              user: response.userData,
            },
          };
          this.router.navigate(['/home'], navigationExtras);
          this.loginForm.reset();
        },
        (err) => {
          this.showErrorToast(err.error.message);
        }
      );
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
