import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRegister } from '../model/usuario-register';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = 'https://raffle-restapi.onrender.com/api/user'

  public register(userRegister:UsuarioRegister):Observable<any>{
    return this.http.post(this.apiUrl+"/register",userRegister);
  }
}
