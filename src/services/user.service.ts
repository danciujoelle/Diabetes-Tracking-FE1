import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:44389/";

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addUser(user: UserModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/users/signup', JSON.stringify(user), this.httpHeader);
  }

  verifyUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + `api/users/login/${username}`, JSON.stringify(password), this.httpHeader);
  }
}
