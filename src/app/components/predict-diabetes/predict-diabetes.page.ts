import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-predict-diabetes',
  templateUrl: './predict-diabetes.page.html',
  styleUrls: ['./predict-diabetes.page.scss'],
})
export class PredictDiabetesPage implements OnInit {

  private userId: string;
  predictionForm: FormGroup;
  isSubmitted: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.userId;
      }
    });

    this.predictionForm = this.formBuilder.group({
      pregnancies: ['', [Validators.required]],
      glucose: ['', [Validators.required]],
      bloodPressure: ['', [Validators.required]],
      skinThickness: ['', [Validators.required]],
      insulin: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      pedigreeFunction: ['', [Validators.required]],
      age: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.predictionForm.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(!this.predictionForm.valid){
      console.log("Please provide all the required values!")
      return false;
    } else {
      console.log("suntem bine")
      };
    }
}

