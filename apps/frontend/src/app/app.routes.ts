import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompoundComponent } from './compound/compound.component';
import { CompoundFormComponent } from './compound-form/compound-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compounds/:id', component: CompoundComponent },
  { path: 'compound/add', component: CompoundFormComponent },
  { path: 'compound/edit/:id', component: CompoundFormComponent },
];
