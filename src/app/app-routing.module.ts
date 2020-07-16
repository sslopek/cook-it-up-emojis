import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PlayComponent } from './play/play.component';


const routes: Routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: PlayComponent },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
