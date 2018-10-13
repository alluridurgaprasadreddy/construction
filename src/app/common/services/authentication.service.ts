import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../../app.settings';

@Injectable()
export class AuthenticationService {
  public userLoggedIn = false;

  constructor(private http: Http, private _apiService: ApiService) { }

  login(username: string, password: string) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = {
      'username': username,
      'password': password,
    };

    return this.http.post(AppSettings.LOGIN_API, body, options)
      .pipe(.map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        console.log(user);
        if (user && user.token) {
          sessionStorage.setItem('currentUser', user.token);
          sessionStorage.setItem('name', user.name);
          sessionStorage.setItem('mobile_no', user.mobile_no);
          sessionStorage.setItem('email_id', user.email_id);
          this.userLoggedIn = true;
        } else {
          this.userLoggedIn = false;
          console.log('Authentication Fails');
        }

      }));
  }

  logout() {
    sessionStorage.clear();
  }

}
