export class PredictionModel {
    Pregnancies: number;
    PlasmaGlucose: number;
    DiastolicBloodPressure: number;
    TricepsThickness: number;
    SerumInsulin: number;
    BMI: number;
    DiabetesPedigree: number;
    Age: number;

    public constructor(pregnancies: number, plasmaGlucose: number, diastolicBloodPressure: number, tricepsThickness: number, serumInsulin: number, BMI: number, diabetesPedigree: number, age: number) {
        this.Pregnancies = pregnancies;
        this.PlasmaGlucose = plasmaGlucose;
        this.DiastolicBloodPressure = diastolicBloodPressure;
        this.TricepsThickness = tricepsThickness;
        this.SerumInsulin = serumInsulin;
        this.BMI = BMI;
        this.DiabetesPedigree = diabetesPedigree;
        this.Age = age;
    }
}