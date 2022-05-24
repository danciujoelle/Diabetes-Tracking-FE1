import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionModel } from 'src/app/models/prediction-model';
import { PredictionService } from 'src/services/prediction.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-predict-diabetes',
  templateUrl: './predict-diabetes.page.html',
  styleUrls: ['./predict-diabetes.page.scss'],
})
export class PredictDiabetesPage implements OnInit {
  predictionForm: FormGroup;
  isSubmitted: boolean;
  private userId: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private predictionService: PredictionService
  ) {}

  ngOnInit() {
    this.userId = this.userService.userDetails.userId;

    this.predictionForm = this.formBuilder.group({
      pregnancies: ['', [Validators.required]],
      glucose: ['', [Validators.required]],
      bloodPressure: ['', [Validators.required]],
      skinThickness: ['', [Validators.required]],
      insulin: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      pedigreeFunction: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.predictionForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.predictionForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const bodyMassIndex = this.computeBMI(
        this.predictionForm.get('weight').value,
        this.predictionForm.get('height').value
      );
      const pregnancies = this.predictionForm.get('pregnancies').value;
      const glucose = this.predictionForm.get('glucose').value;
      const bloodPressure = this.predictionForm.get('bloodPressure').value;
      const skinThickness = this.predictionForm.get('skinThickness').value;
      const insulin = this.predictionForm.get('insulin').value;
      const pedigreeFunction =
        this.predictionForm.get('pedigreeFunction').value;
      const age = this.predictionForm.get('age').value;
      const dataToPredict = new PredictionModel(
        pregnancies,
        glucose,
        bloodPressure,
        skinThickness,
        insulin,
        bodyMassIndex,
        pedigreeFunction,
        age,
        0,
        this.userId
      );
      this.predictionService.addPrediction(dataToPredict).subscribe((data) => {
        console.log(data);
      });
    }
  }

  computeBMI(weight: number, height: number): number {
    return weight / (height ^ 2);
  }
}
