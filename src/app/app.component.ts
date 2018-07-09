import { Component, OnInit } from '@angular/core';
import ICharacter from './models/character/ICharacter';
import { CharacterService } from './services/character/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  characters: ICharacter[];

  constructor(private characterService: CharacterService) {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getAllCharacters()
      .subscribe(characters => {
        this.characters = characters;
      });
  }
}
