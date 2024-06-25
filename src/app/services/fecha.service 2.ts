import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FechaService {
  private fechaObjetivoSubject: BehaviorSubject<Date> =
    new BehaviorSubject<Date>(new Date('2024-06-23T18:00:00'));

  get fechaObjetivo$(): Observable<Date> {
    return this.fechaObjetivoSubject.asObservable();
  }

  setFechaObjetivo(nuevaFecha: Date) {
    this.fechaObjetivoSubject.next(nuevaFecha);
  }
}
