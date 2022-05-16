import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PredictionModel } from 'src/app/models/prediction-model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = "https://localhost:44389/";

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addPrediction(prediction: PredictionModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/predictions/insert', JSON.stringify(prediction), this.httpHeader);
  }
}
