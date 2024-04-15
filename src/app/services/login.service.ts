import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin } from '../model/admin-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = 'https://raffle-restapi.onrender.com/api/admin/'

  public login(adminLogin:AdminLogin):Observable<AdminLogin>{
    return this.http.post<AdminLogin>(this.apiUrl+"login",adminLogin);
  }

  //Localstorage
  public setAdmin(adminLogin:AdminLogin){
    localStorage.setItem("admin",JSON.stringify(adminLogin));
  }

  public getAdmin():any{
    return JSON.parse(localStorage.getItem("admin"));
  }

  public logout():void{
    localStorage.removeItem('admin');
  }

  public isLoggedIn():boolean{
    return this.getAdmin() !== null;
  }
}
