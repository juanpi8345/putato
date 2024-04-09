import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'admin',component:AdminComponent, canActivate: [authGuard]},
    {path:'login',component:LoginComponent},
    //Si ninguna de las rutas anteriores coincide:
    { path: '**', redirectTo: 'home', pathMatch:'full'},
];
