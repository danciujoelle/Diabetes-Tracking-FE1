import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  predictedResult: string;
  validationMessages = {
    pregnancies: [
      { type: 'required', message: 'Pregnancies field is required.' },
    ],
    glucose: [{ type: 'required', message: 'Glucose field is required.' }],
    bloodPressure: [
      { type: 'required', message: 'Blood pressure field is required.' },
    ],
    skinThickness: [
      { type: 'required', message: 'Skin thickness field is required.' },
    ],
    insulin: [{ type: 'required', message: 'Insulin field is required.' }],
    weight: [{ type: 'required', message: 'Weight field is required.' }],
    height: [{ type: 'required', message: 'Height field is required.' }],
    pedigreeFunction: [
      { type: 'required', message: 'Pedigree function field is required.' },
    ],
    age: [{ type: 'required', message: 'Age field is required.' }],
  };
  private userId: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private predictionService: PredictionService
  ) {}

  get errorControl() {
    return this.predictionForm.controls;
  }

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
        console.log(data.message.result);
        this.predictedResult = data.message.result;
      });
    }
  }

  computeBMI(weight: number, height: number): number {
    return weight / (height ^ 2);
  }

  pregFieldHasError(): boolean {
    return (
      this.predictionForm.get('pregnancies').hasError('required') &&
      this.isSubmitted
    );
  }

  glucoseFieldHasError(): boolean {
    return (
      this.predictionForm.get('glucose').hasError('required') &&
      this.isSubmitted
    );
  }
  bloodFieldHasError(): boolean {
    return (
      this.predictionForm.get('bloodPressure').hasError('required') &&
      this.isSubmitted
    );
  }
  skinFieldHasError(): boolean {
    return (
      this.predictionForm.get('skinThickness').hasError('required') &&
      this.isSubmitted
    );
  }
  insulinFieldHasError(): boolean {
    return (
      this.predictionForm.get('insulin').hasError('required') &&
      this.isSubmitted
    );
  }
  heightFieldHasError(): boolean {
    return (
      this.predictionForm.get('weight').hasError('required') && this.isSubmitted
    );
  }
  weightFieldHasError(): boolean {
    return (
      this.predictionForm.get('height').hasError('required') && this.isSubmitted
    );
  }
  pedigreeFieldHasError(): boolean {
    return (
      this.predictionForm.get('pedigreeFunction').hasError('required') &&
      this.isSubmitted
    );
  }
  ageFieldHasError(): boolean {
    return (
      this.predictionForm.get('age').hasError('required') && this.isSubmitted
    );
  }
}
