import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdminService } from '../../services/admin.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  raffle: Raffle = new Raffle();

  constructor(private adminService: AdminService) {}
  //acá hay que ejecutar funciones creadas en el admin.service
  addRaffle() {
    this.adminService.addRaffle(this.raffle).subscribe(
      (response) => {
        console.log('Se ha generado la rifa');
      },
      (error) => {
        console.log('Error al generar la rifa');
      }
    );
  }
  makeRaffle() {
    this.adminService.makeRaffle().subscribe(
      (response) => {
        console.log('Se realizó el sorteo');
      },
      (error) => {
        console.log('Error al sortear');
      }
    );
  }
}
