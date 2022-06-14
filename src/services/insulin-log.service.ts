import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsulinLogModel } from 'src/app/models/insulin-log-model';

@Injectable({
  providedIn: 'root',
})
export class InsulinLogService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'https://localhost:44389/';

  constructor(private http: HttpClient) {}

  addLog(insulinLog: InsulinLogModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/insulin/log',
      JSON.stringify(insulinLog),
      this.httpHeader
    );
  }

  getLogs(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/insulin/logs/${userId}`,
      this.httpHeader
    );
  }

  needsReminder(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/insulin/reminder/${userId}`,
      this.httpHeader
    );
  }
}
