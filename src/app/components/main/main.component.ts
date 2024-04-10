import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioRegister } from '../../model/usuario-register';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private userService:UserServiceService){}

  usuarioRegister : UsuarioRegister = new UsuarioRegister();
  message : string;
  responseStatus : any;

  register():void{
    if(this.usuarioRegister.email.length > 0 && this.usuarioRegister.instagram.length > 0){
      this.userService.register(this.usuarioRegister).subscribe((response)=>{
        this.message = "Usuario registrado con exito";
        this.responseStatus = response.status;
        //Swal.fire("Usuario registrado","El usuario se registro correctamente","success");
      },err=>{
        console.log(err);
        this.responseStatus = err.status;
        if(err.status = 400)
          this.message = "Ya existe un usuario con ese instagram y/o email";
          //Swal.fire("Usuario existente","Ya existe un usuario con ese instagram y/o email","warning");
      })
    }else
      //Swal.fire("Campos sin completar","Completa los campos antes de registrarte","error");
      this.message = "Completa los campos antes de registrarte";
  }
}
