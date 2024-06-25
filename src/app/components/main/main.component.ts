import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioRegister } from '../../model/usuario-register';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { Raffle } from '../../model/raffle';
import { ContadorReversaModule } from '../contador-reversa/contador-reversa.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, ContadorReversaModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  @Input() raffleImages: string[] = [];

  constructor(private userService: UserServiceService) {}

  usuarioRegister: UsuarioRegister = new UsuarioRegister();
  message: string;
  responseStatus: any;
  responseGetRaffle: string;
  raffle: Raffle;

  ngOnInit():void{
    this.userService.getRaffle().subscribe((raffle:Raffle)=>{
      this.raffle = raffle;      
    })
  }

  scrollDown() {
    const element = document.querySelector('h3');
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  selectOne() {
    window.open('https://mpago.la/1Euh7da');
  }
  selectThree() {
    window.open('https://mpago.la/1XG65p3');
  }
  selectTen() {
    window.open('https://mpago.la/1KuLfuZ');
  }
}
