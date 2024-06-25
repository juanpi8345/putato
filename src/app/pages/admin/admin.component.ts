import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MainComponent } from '../../components/main/main.component';
import { AdminService } from '../../services/admin.service';
import { Raffle } from '../../model/raffle';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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
  message: string = '';

  constructor(
    private adminService: AdminService,
    private loginService: LoginService,
    private router: Router
  ) { }


  ngOnInit() {

  }


  transformDriveUrl(url: string): string {
    const drivePrefix = 'https://drive.google.com/file/d/';
    const driveSuffix = '/view?usp=sharing';
    const transformedPrefix = 'https://drive.google.com/uc?export=view&id=';


    if (url.startsWith(transformedPrefix)) {
      console.log("Already a transformed Drive URL, returning original:", url);
      return url;
    }

    // Verificar si la URL es de Google Drive
    if (url.startsWith(drivePrefix) && url.includes(driveSuffix)) {
      const fileIdStart = url.indexOf(drivePrefix) + drivePrefix.length;
      const fileIdEnd = url.indexOf(driveSuffix);
      const fileId = url.substring(fileIdStart, fileIdEnd);
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    console.log("Not a Drive URL, returning original:", url); // Log non-Drive URLs

    return url;
  }
  submitForm() {

    this.raffle.name = "SORTEO ACTUAL";

    if (this.raffle.urlImage1 === '' || this.raffle.urlImage2 === '' || this.raffle.urlImage3 === '' || this.raffle.raffleDate === ''
      || this.raffle.price10Chance == null ||this.raffle.price1Chance == null ||this.raffle.price3Chance == null || this.raffle.urlMp10Chance === ''
      || this.raffle.urlMp3Chance === '' || this.raffle.urlMp10Chance === '' ) {
      this.message = "Debes ingresar todos los campos";
      return;
    }
    console.log("Before transformation:", this.raffle.urlImage1, this.raffle.urlImage2, this.raffle.urlImage3);

    this.raffle.urlImage1 = this.transformDriveUrl(this.raffle.urlImage1);
    this.raffle.urlImage2 = this.transformDriveUrl(this.raffle.urlImage2);
    this.raffle.urlImage3 = this.transformDriveUrl(this.raffle.urlImage3);

    console.log("After transformation:", this.raffle.urlImage1, this.raffle.urlImage2, this.raffle.urlImage3);

    this.adminService.addRaffle(this.raffle).subscribe(() => {
      /*      alert("Sorteo agregado correctamente");*/
      this.message = "Sorteo agregado correctamente!";
    }, err => {
      if (err.status === 400)
        /*        alert("Ya existe un sorteo activo");*/
        this.message = "Ya existe un sorteo activo.";

      else
        /*        alert("Ocurrió un error...");*/
        this.message = "Ocurrió un error...";
    });
  }

  deleteRaffle() {
    this.adminService.deleteRaffle().subscribe(() => {
      /*      alert("Sorteo eliminado con exito");*/
      this.message = "Sorteo eliminado con exito";
    }, err => {
      /*      alert("No hay un sorteo activo")*/
      this.message = "Hola! No hay un sorteo activo.";
    });

  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
