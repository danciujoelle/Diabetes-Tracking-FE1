import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  submitForm: FormGroup;
  todayDate  = new Date();
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      dateOfBirth: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.submitForm.get('dateOfBirth').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.submitForm.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(!this.submitForm.valid){
      console.log("Please provide all the required values!")
      return false;
    } else {
      const user =  new UserModel(this.submitForm.get('firstName').value, this.submitForm.get('lastName').value, this.submitForm.get('email').value, this.submitForm.get('dateOfBirth').value, this.submitForm.get('username').value, this.submitForm.get('password').value);
      this.userService.addUser(user).subscribe((data) => {
        if(data.statusCode === 200) {
          this.submitForm.reset();
        }
      });
    }
  }

}
