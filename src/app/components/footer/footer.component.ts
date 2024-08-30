import { Component } from '@angular/core';
import { UsuarioRegister } from '../../model/usuario-register';
import { UserServiceService } from '../../services/user-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private userService: UserServiceService) {}
  usuarioRegister: UsuarioRegister = new UsuarioRegister();
  responseStatus: any;

  register(): void {
    // if (
    //   this.usuarioRegister.email.length > 0 &&
    //   this.usuarioRegister.instagram.length > 0
    // ) {
    //   this.userService.register(this.usuarioRegister).subscribe(
    //     (response) => {
    this.responseStatus = 'TE REGISTRASTE!!';
    //       this.usuarioRegister.email = '';
    //       this.usuarioRegister.instagram = '';
    //     },
    //     (err) => {
    //       this.responseStatus = err.status;
    //       if (err.status == 400) {
    //         this.responseStatus = 'YA ESTAS REGISTRADO!';
    //       }
    //     }
    //   );
    // } else {
    //   this.responseStatus = 'Completa los campos antes de registrarte';
    // }
  }
}
