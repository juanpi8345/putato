import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioRegister } from '../../model/usuario-register';
import { UserServiceService } from '../../services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private userService:UserServiceService){}

  usuarioRegister : UsuarioRegister = new UsuarioRegister();
  message : string;

  register():void{
    if(this.usuarioRegister.email.length > 0 && this.usuarioRegister.instagram.length > 0){
      this.userService.register(this.usuarioRegister).subscribe(data=>{
        this.message = data.message;
        Swal.fire("Usuario registrado","El usuario se registro correctamente","success");
      })
    }
    
  }

}
