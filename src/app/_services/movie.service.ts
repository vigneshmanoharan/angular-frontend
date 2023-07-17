import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Movie } from '@app/_models';

const baseUrl = `${environment.apiUrl}/movie`;

@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Movie[]>(`${baseUrl}/list`);
    }

    getById(id: string) {
        return this.http.get<Movie>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}