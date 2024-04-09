import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'admin',component:AdminComponent},
    //Si ninguna de las rutas anteriores coincide:
    { path: '**', redirectTo: 'home', pathMatch:'full'},
];
