import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminService } from '../../services/admin.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    MainComponent,
    CommonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  raffle: Raffle = new Raffle();
  message: string = '';

  constructor(
    private adminService: AdminService,
    private loginService:LoginService,
    private router:Router
  ) {}


  ngOnInit(){

  }

  submitForm() {

    this.raffle.name = "SORTEO ACTUAL";
  
    if (this.raffle.urlImage1 === '' || this.raffle.urlImage2 === '' || this.raffle.urlImage3 === '' || this.raffle.raffleDate === '') {
      this.message="Hola! Debes ingresar todos los campos";
      return;
    }

    this.adminService.addRaffle(this.raffle).subscribe(() => {
      this.message = "Sorteo agregado correctamente!";
    }, err => {
      if (err.status === 400){
        this.message = "Ya existe un sorteo activo.";
      }
      else{this.message = "Ocurrió un error..."};
    });
  }

  deleteRaffle(){
    this.adminService.deleteRaffle().subscribe(()=>{
    this.message= "Sorteo eliminado con exito";
    },err=>{
    this.message= "No hay un sorteo activo.";
    });

  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
