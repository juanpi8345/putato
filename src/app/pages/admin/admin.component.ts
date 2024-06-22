import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminService } from '../../services/admin.service';
import { FechaService } from '../../services/fecha.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule, DatePipe } from '@angular/common';

import { parse, format } from 'date-fns';

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
  constructor(
    private adminService: AdminService,
    private userService: UserServiceService,
    private fechaService: FechaService,
    private datePipe: DatePipe
  ) {}


  ngOnInit(){

  }

  submitForm() {
    // La API debe recibir un nombre también, por eso es hardcodeado
    this.raffle.name = "SORTEO ACTUAL";

    if(this.raffle.urlImage1 === '' || this.raffle.urlImage2 === ''
       ||this.raffle.urlImage3 === '' || this.raffle.raffleDate === ''){
        alert("Debes ingresar todos los campos");
        return;
    }
    this.adminService.addRaffle(this.raffle).subscribe(() => {
      alert("Imágenes y fechas agregadas correctamente");
    }, err => {
      if (err.status === 400)
        alert("Ya existen imágenes para el sorteo");
      else
        alert("Ocurrió un error...");
    });
  }

  // convertToDateTimeLocal(date: string): string {
  //   const parsedDate = parse(date, 'dd-MM-yyyy HH:mm:ss', new Date());
  //   return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
  // }
}
