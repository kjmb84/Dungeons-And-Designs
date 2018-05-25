import { Pipe, PipeTransform } from '@angular/core';
import ICharacter from '../models/character/ICharacter';
import IAbility from '../models/character/IAbility';
import { isObject, isArray } from 'util';

@Pipe({
  name: 'abilityTrueScore'
})
export class AbilityTrueScorePipe implements PipeTransform {
  abilityTrueScores = [];

  transform(abilities: UpgradedAbility[], character: ICharacter): any {
    for (const ability of abilities) {
      ability.breakdown = [];
      this.abilityTrueScores.push(this.recursiveAttributeFindFromCharacterInterface(ability, character));
    }

    return abilities;
  }

  recursiveAttributeFindFromCharacterInterface(ability: UpgradedAbility, obj): UpgradedAbility {
    if (isObject(obj)) {
      for (const key of Object.keys(obj)) {
        const newObj = obj[key];
        if (key === 'attributes') {
          ability = this.addModifiersToAbility(ability, newObj, obj);
        } else if (isArray(obj[key])) {
          newObj.forEach(index => ability = this.recursiveAttributeFindFromCharacterInterface(ability, index));
        } else if (isObject(obj[key])) {
          ability = this.recursiveAttributeFindFromCharacterInterface(ability, obj[key]);
        }
      }
    }
    return ability;
  }

  addModifiersToAbility(ability, attribute, parent) {
    if (isArray(attribute)) {
      attribute.forEach(modifier => {
        if (ability.name === modifier.name) {
          ability.score += modifier.modifier;
          ability.breakdown.push(attribute);
        }
      });
    }
    return ability;
  }
}

interface UpgradedAbility extends IAbility {
  breakdown: Array<object>;
}
