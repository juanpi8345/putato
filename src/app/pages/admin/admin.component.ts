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
    //Se convierte la fecha a formato YYYY/MM/DD, por como la recibe el backend.
    this.raffle.raffleDate = this.convertDate(this.raffle.raffleDate);
    //La api debe recibir un nombre tambien, por eso es harcodeado...
    this.raffle.name="SORTEO ACTUAL";
    this.adminService.addRaffle(this.raffle).subscribe(()=>{
      alert("Imagenes y fechas agregadas correctamente");
    },err=>{
      if(err.status == 400)
        alert("Ya existen imagenes para el sorteo");
      else
        alert("Ocurrio un error...")
    })
  }

  convertDate(date: string): string | null {
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    return this.datePipe.transform(formattedDate, 'yyyy/MM/dd');
  }
}
