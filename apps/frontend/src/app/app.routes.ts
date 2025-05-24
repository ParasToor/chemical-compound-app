import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompoundComponent } from './compound/compound.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compounds/:id', component: CompoundComponent },
];
