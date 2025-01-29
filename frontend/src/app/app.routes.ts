import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                title: 'Home',
                loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
            }
        ]        
    },
];
