import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../../../services/character/character.service';
import ICharacter from '../../../models/character/ICharacter';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {

  @Input() character: ICharacter;

  constructor() { }

  ngOnInit() {
  }

}
