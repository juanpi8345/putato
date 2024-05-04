import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home',component:HomeComponent},
    {path:'admin',component:AdminComponent, canActivate: [authGuard]},
    {path:'login',component:LoginComponent},
    //Si ninguna de las rutas anteriores coincide:
    { path: '**', redirectTo: 'home', pathMatch:'full'},
];


@NgModule({
    imports:[RouterModule.forRoot(routes,{useHash:true})],
    exports:[RouterModule]
})

export class AppRoutingModule{}