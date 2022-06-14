import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlucoseLogModel } from 'src/app/models/glucose-log-model';

@Injectable({
  providedIn: 'root',
})
export class GlucoseLogService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'https://localhost:44389/';

  constructor(private http: HttpClient) {}

  addLog(glucoseLog: GlucoseLogModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/glucose/log',
      JSON.stringify(glucoseLog),
      this.httpHeader
    );
  }

  getLogs(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/glucose/logs/${userId}`,
      this.httpHeader
    );
  }

  needsReminder(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/glucose/reminder/${userId}`,
      this.httpHeader
    );
  }
}
