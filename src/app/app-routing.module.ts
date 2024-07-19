import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { canGetHome, isPublicPath } from './auth/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [isPublicPath] },
    { path: 'sign-up', component: SignUpComponent, canActivate: [isPublicPath] },
    { path: 'home', component: HomeComponent, canActivate: [canGetHome] },
    { path: '**', pathMatch: 'full', component: LoginComponent, canActivate: [isPublicPath] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
