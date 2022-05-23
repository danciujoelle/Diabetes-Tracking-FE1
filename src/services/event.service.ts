import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData } from 'src/app/models/event-data';
import { EventModel } from 'src/app/models/event-model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:44389/';

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  addAppointment(appointment: EventModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/events/insert',
      JSON.stringify(appointment),
      this.httpHeader
    );
  }

  getAppointments(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/events/${userId}`,
      this.httpHeader
    );
  }
}
