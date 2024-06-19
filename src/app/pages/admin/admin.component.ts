import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminService } from '../../services/admin.service';
import { FechaService } from '../../services/fecha.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

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
  raffleTwo: Raffle = new Raffle();
  raffleThree: Raffle = new Raffle();
  nuevaFecha: Date;

  constructor(
    private adminService: AdminService,
    private userService: UserServiceService,
    private fechaService: FechaService
  ) {}

  actualizarFecha() {
    if (this.nuevaFecha) {
      this.fechaService.setFechaObjetivo(this.nuevaFecha);
    }
  }
  submitForm() {
    const raffleImages = [
      this.raffle.urlImage,
      this.raffleTwo.urlImage,
      this.raffleThree.urlImage,
    ];
  }
}
