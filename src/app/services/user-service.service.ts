import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRegister } from '../model/usuario-register';
import { Raffle } from '../model/raffle';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = 'https://raffle-restapi.onrender.com/api/'

  public register(userRegister:UsuarioRegister):Observable<any>{
    return this.http.post(this.apiUrl+"user/register",userRegister);
  }

  //Este metodo se usara en la seccion home
  //Se llama a la api para cargar los datos del sorteo
  //Su imagen y nombre
  public getRaffle():Observable<Raffle>{
    return this.http.get<Raffle>(this.apiUrl +"raffle/get")
  }
}
