import { Injectable }  from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable()
export class TokenStorage {
    constructor(){}
    public getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }
}