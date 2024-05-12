import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RatiosComponent } from './ratios/ratios.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'ratios', component: RatiosComponent}
];
