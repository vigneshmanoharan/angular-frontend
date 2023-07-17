import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const movieModule = () => import('./movie/movie.module').then(x => x.MovieModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movie', loadChildren: movieModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }