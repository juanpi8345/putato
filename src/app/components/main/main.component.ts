import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioRegister } from '../../model/usuario-register';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { Raffle } from '../../model/raffle';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, SlickCarouselModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private userService: UserServiceService) {}

  usuarioRegister: UsuarioRegister = new UsuarioRegister();
  message: string;
  responseStatus: any;
  responseGetRaffle: string;

  raffle: Raffle = new Raffle();

  scrollDown() {
    document.querySelector('.chances').scrollIntoView({ behavior: 'smooth' });
  }

  selectOne() {
    window.open('https://mpago.la/17FJoL8');
  }

  selectThree() {
    //    window.location.href = 'https://mpago.la/2xr7y4H';
    window.open('https://mpago.la/2xr7y4H');
  }

  selectTen() {
    //    window.location.href = 'https://mpago.la/1CiVSyp';
    window.open('https://mpago.la/1CiVSyp');
  }

  getRaffle() {
    this.userService.getRaffle().subscribe(
      (response) => {
        this.raffle = response;
      },
      (error) => {
        //        alert('No existe sorteo activo');
        this.responseGetRaffle = 'No hay sorteo activo';
      }
    );
  }
}
