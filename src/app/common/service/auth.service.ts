import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedStatus = JSON.parse(localStorage.getItem("loggedIn") || 'false');

  constructor(private http: HttpClient) {
  }

  getUserDetails(email: string, password: string): Observable<any> {

    // @ts-ignore
    return this.http.post('http://localhost:8080/api/user/login', {email, password})

  }

  setUserDetails(firstName: string, lastName: string, email: string, phone: string, password: string): Observable<any> {

    return this.http.post('http://localhost:8080/api/user/register', {firstName, lastName, email, phone, password});

  }

  setLoggedIn(value: boolean) {
    this.loggedStatus = value;
    localStorage.setItem("loggedIn", "true")

  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedIn") || this.loggedStatus.toString());
  }



}
