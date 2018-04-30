import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import ICharacter from '../models/character/ICharacter';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CharacterService {

  characters: ICharacter[] = [];
  private charactersUrl = `${environment.apiUrl}/character`;

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<ICharacter[]> {
    return this.http.get<ICharacter[]>(this.charactersUrl);
  }

}
