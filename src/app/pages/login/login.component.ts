import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminLogin } from '../../model/admin-login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  adminLogin: AdminLogin = new AdminLogin();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    console.log(this.loginService.isLoggedIn());
  }

  login() {
    this.loginService
      .login(this.adminLogin)
      .subscribe((adminLogin: AdminLogin) => {
        this.loginService.setAdmin(adminLogin);
        this.router.navigate(['/admin']);
      },err=>{alert("Credenciales incorrectas")});
  }
}
