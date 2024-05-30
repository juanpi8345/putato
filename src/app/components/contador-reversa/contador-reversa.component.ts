import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reverse-counter',
  templateUrl: './contador-reversa.component.html',
  styleUrls: ['./contador-reversa.component.css'],
})
export class ContadorReversaComponent implements OnInit {
  fechaObjetivo: Date = new Date('2024-06-07T22:00:00');
  tiempoRestante: any = {};

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.actualizarContador();
    }, 1000);
    this.actualizarContador();
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
