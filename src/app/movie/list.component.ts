import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService, MovieService } from '@app/_services';
import { Movie } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    movies!: Movie[];

    constructor(private movieService: MovieService, private alertService: AlertService) {}

    ngOnInit() {
        this.movieService.getAll()
            .pipe(first())
            .subscribe(movies => this.movies = movies);
    }

    deleteMovie(id: string) {
        const user = this.movies.find(x => x.id === id);
        if (!user) return;
        this.movieService.delete(id)
            .pipe(first())
            .subscribe(() =>{
                this.alertService.success('Movie updated', { keepAfterRouteChange: true });
                this.movies = this.movies.filter(x => x.id !== id)
            });
    }
}