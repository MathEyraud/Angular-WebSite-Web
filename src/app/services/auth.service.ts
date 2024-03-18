import {JwtHelperService} from "@auth0/angular-jwt";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL_BASE} from "../conf/constant";
import {BasicUser} from "../models/basic-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return this.helper.isTokenExpired(token) ? false : !!token;
  }
  public isTokenExpired() {
    const token = localStorage.getItem('jwt');
    return this.helper.isTokenExpired(token);
  }

  public login(authRequest: any): Observable<any> {
    return this.http.post<any>(`${URL_BASE}/users/generateToken`, authRequest);
  }

  saveToken(token: string) {
    localStorage.setItem("jwt", token);
  }

  getToken() {
    return localStorage.getItem("jwt");
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('current_user');
  }

  public getEmail(): any {
    const token = this.getToken();
    if (token) {
      const decodeToken = this.helper.decodeToken(token);
      return decodeToken.sub
    }
    return null
  }

  public getRoles(): any {
    const token = this.getToken();
    if (token) {
      const decodeToken = this.helper.decodeToken(token);
      return decodeToken.roles
    }
    return null
  }

  public getAccountStatus(): string {
    const token = this.getToken();
    if (token) {
      const decodeToken = this.helper.decodeToken(token);
      return decodeToken.status
    }
    return "WAITING";
  }

  public getProfile(): string {
    const profile = localStorage.getItem('profil');
    if (profile == "COMPLETE") {
      return profile;
    }
    return "WAITING";
  }

}
