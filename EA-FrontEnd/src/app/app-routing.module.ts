import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventScreenComponent } from './components/event-screen/event-screen.component';
import { UserListComponent } from './components/UserList/userlist.component';
import { UsersUpdateComponent } from './components/users-update/users-update.component';
import { MinimoComponent } from './minimo/minimo.component';
import { SeriesScreenComponent } from './series-screen/series-screen.component';
import { ValoracionComponent } from './valoracion/valoracion.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event-screen', component: EventScreenComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'users-update/:_id', component: UsersUpdateComponent },
  { path: 'minimo', component: MinimoComponent},
  { path: 'series-screen', component: SeriesScreenComponent},
  { path: 'valoracion/:_id', component: ValoracionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
