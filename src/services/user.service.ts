import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { UserData } from 'src/app/models/user-data';
import { UpdatePasswordRequestDto } from 'src/app/models/update-password-request-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: UserData;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl = 'https://localhost:44389/';

  constructor(private http: HttpClient) {}

  addUser(user: UserModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/users/signup',
      JSON.stringify(user),
      this.httpHeader
    );
  }

  verifyUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + `api/users/login/${username}`,
      JSON.stringify(password),
      this.httpHeader
    );
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    const requestBody = new UpdatePasswordRequestDto(userId, newPassword);
    return this.http.post<any>(
      this.apiUrl + 'api/users/update/password',
      JSON.stringify(requestBody),
      this.httpHeader
    );
  }

  updateUser(updatedUser: UserModel): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'api/users/update',
      JSON.stringify(updatedUser),
      this.httpHeader
    );
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `api/users/${userId}`,
      this.httpHeader
    );
  }
}
