import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private adminService:AdminService){}

}
