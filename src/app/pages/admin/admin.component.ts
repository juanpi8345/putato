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
  ) {}

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
        alert('');
      },
      (error) => {
        alert('SORTEO REALIZADO!');
      }
    );
  }
  getRaffleUsers() {
    this.adminService.getRaffleUsers().subscribe(
      (response) => {
        this.participantes.push(...response);
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
