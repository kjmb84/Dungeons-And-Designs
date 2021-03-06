import { Component, OnInit } from '@angular/core';
import ICharacter from './models/character/ICharacter';
import { CharacterService } from './services/character/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  characters: ICharacter[];
  character: ICharacter;

  constructor(private characterService: CharacterService) {
  }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getAllCharacters()
      .subscribe(characters => {
        this.characters = characters;
        this.character = this.characters[0];
      });
  }
}
