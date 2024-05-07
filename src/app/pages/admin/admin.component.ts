import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminService } from '../../services/admin.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';
import { Winner } from '../../model/winner';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { UsuarioRegister } from '../../model/usuario-register';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  ganador: Winner = new Winner();
  participantes: UsuarioRegister[] = [];
  historicalGanadores: Winner[] = [];

  constructor(
    private adminService: AdminService,
    private userService: UserServiceService
  ) { }

  ngOnInit() {
    // this.getRaffle();
  }

  getRaffle() {
    this.userService.getRaffle().subscribe(
      (response) => {
        this.raffle = response;
      },
      (error) => {
        //settear mensaje de error
      }
    );
  }
  addRaffle() {
    this.adminService.addRaffle(this.raffle).subscribe(
      (response) => {
        this.raffle = response;
        alert('SORTEO NUEVO HECHO!');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  makeRaffle() {
    this.adminService.makeRaffle().subscribe(
      (response) => {
        this.ganador.emailWinner = response.emailWinner;
        this.ganador.instagramWinner = response.instagramWinner;
        this.ganador.raffleName = response.raffleName;
        alert('SORTEO REALIZADO!');
      },
      (error) => {
        //Esto es un caso de error
        //alert('SORTEO REALIZADO!');
      }
    );
  }
  getRaffleUsers() {
    this.adminService.getRaffleUsers().subscribe(
      (response) => {
        
        const header = ["INSTAGRAM","EMAIL","CHANCES"];
        const data = [header, ...response.map(user => [user.instagram, user.email, user.chances])];
  
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const excelBuffer: any = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });

        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'usuarios.xlsx');
        //this.participantes.push(...response);
      },
      (error) => {
        alert('NO HAY PARTICIPANTES DEL SORTEO!');
      }
    );
  }

  getHistoricalWinners() {
    this.adminService.getHistoricalWinners().subscribe((response) => {
      this.historicalGanadores.push(...response);
      console.log(response);
    });
  }
}
