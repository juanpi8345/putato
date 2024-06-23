import { Component, OnInit } from '@angular/core';
import { FechaService } from '../../services/fecha.service';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';
import { Raffle } from '../../model/raffle';

@Component({
  selector: 'app-reverse-counter',
  templateUrl: './contador-reversa.component.html',
  styleUrls: ['./contador-reversa.component.css'],
})
export class ContadorReversaComponent implements OnInit {
  //fechaObjetivo: Date = new Date('2024-06-23T18:00:00');
  fechaObjetivo: Date;
  tiempoRestante: any = {};

  private fechaSubscription: Subscription;

  constructor(private fechaService: FechaService, private userService:UserServiceService) {}

  ngOnInit(): void {
    this.userService.getRaffle().subscribe((raffle:Raffle)=>{
      this.fechaObjetivo = new Date(raffle.raffleDate);
    })
    this.fechaSubscription = this.fechaService.fechaObjetivo$.subscribe(
      (nuevaFecha) => {
        this.fechaObjetivo = nuevaFecha;
        this.actualizarContador();
      }
    );

    setInterval(() => {
      this.actualizarContador();
    }, 1000);
    this.actualizarContador();
  }

  ngOnDestroy(): void {
    if (this.fechaSubscription) {
      this.fechaSubscription.unsubscribe();
    }
  }

  actualizarContador(): void {
    const ahora = new Date();
    const diferencia = this.fechaObjetivo.getTime() - ahora.getTime();

    if (diferencia <= 0) {
      this.tiempoRestante = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
      };
    } else {
      this.tiempoRestante = {
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferencia / 1000 / 60) % 60),
        segundos: Math.floor((diferencia / 1000) % 60),
      };
    }
  }
}
