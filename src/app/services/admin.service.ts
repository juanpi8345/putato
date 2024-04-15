import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Raffle } from '../model/raffle';
import { Winner } from '../model/winner';
import { UsuarioRegister } from '../model/usuario-register';

@Injectable({
  providedIn: 'root'
})
//Este servicio tiene todas las funciones a las que puede acceder solo el admin.
export class AdminService {

  constructor(private http: HttpClient, private loginService: LoginService) {
    //Ni bien se llama al servicio, se obtienen la credenciales del admin.
    this.getCredentials()
    //Dentro de las backticks ``, se llama al endpoint correspondiente 
    //y se envian las credenciales del administrador
  }

  private apiUrl: string = 'https://raffle-restapi.onrender.com/api/';

  private username: string;
  private hashedPassword: string;

  //Sorteos

  //Los metodos que tienen un observable de tipo any retornan una respuesta de exito o error
  //Si ya existe un sorteo, el metodo dara un error.
  addRaffle(raffle: Raffle): Observable<any> {
    return this.http
      .post(this.apiUrl + `raffle/add?username=${this.username}&password=${this.hashedPassword}`, raffle);
  }

  //Este metodo hace el sorteo
  makeRaffle(): Observable<any> {
    return this.http
      .post(this.apiUrl + `raffle/make?username=${this.username}&password=${this.hashedPassword}`, null);
  }

  //Este metodo no se deberia usar, solo si el admin agrega un sorteo por error, (no participe nadie) y quiera eliminarlo.
  //Si hay usuarios participantes que pagaron, serian eliminados... 
  deleteRaffle(): Observable<any> {
    return this.http
      .delete(this.apiUrl + `raffle/delete?username=${this.username}&password=${this.hashedPassword}`);
  }

  //Usuarios participantes del sorteo
  //Como solo puede haber un sorteo a la vez, no hace falta pasarle nada a este metodo
  //La api se encarga de buscar el sorteo activo y devolver sus usuarios
  //El modelo UsuarioRegister tiene los campos del usuario a mostrar
  getRaffleUsers(): Observable<UsuarioRegister[]> {
    return this.http
      .get<UsuarioRegister[]>(this.apiUrl + `user/get?username=${this.username}&password=${this.hashedPassword}`);
  }

  //Historial de ganadores
  getHistoricalWinners(): Observable<Winner[]> {
    return this.http
      .get<Winner[]>(this.apiUrl + `winner/get?username=${this.username}&password=${this.hashedPassword}`);
  }

  //Metodo aux
  //Obtiene las credenciales del usuario del localstorage y las setea
  private getCredentials(): void {
    let admin = this.loginService.getAdmin();
    this.username = admin.username;
    this.hashedPassword = admin.password;
  }
}
