import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SportLogModel } from 'src/app/models/sport-log-model';

@Injectable({
  providedIn: 'root',
})
export class SportLogService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'https://localhost:44389/';

  constructor(private http: HttpClient) {}

  addLog(sportLog: SportLogModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/sport/log',
      JSON.stringify(sportLog),
      this.httpHeader
    );
  }

  getLogs(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/sport/logs/${userId}`,
      this.httpHeader
    );
  }
}
