import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import ICharacter from '../../../models/character/ICharacter';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  characters: ICharacter[];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getAllCharacters()
    .subscribe(characters => this.characters = characters);
  }

}
