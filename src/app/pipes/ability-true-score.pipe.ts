import { Pipe, PipeTransform } from '@angular/core';
import ICharacter from '../models/character/ICharacter';
import IAbility from '../models/character/IAbility';

@Pipe({
  name: 'abilityTrueScore'
})
export class AbilityTrueScorePipe implements PipeTransform {
  abilityTrueScores = [];

  transform(abilities, character: ICharacter): any {
    for (const ability of abilities) {
      const upgradedAbility: IAbility & { breakdown: object } = ability;
      upgradedAbility.breakdown = this.recursiveAttributeFindFromCharacterInterface(upgradedAbility.name, character, upgradedAbility, {});
      this.abilityTrueScores.push(upgradedAbility);
      console.log(upgradedAbility);
      // this.abilityTrueScores.push(this.recursiveAttributeFindFromCharacterInterface(ability.name, character, ability));
    }
    console.log(this.abilityTrueScores);
    
    return this.abilityTrueScores;
  }

  recursiveAttributeFindFromCharacterInterface(abilityName, obj, ability, abilityTrueScore) {
    abilityTrueScore = abilityTrueScore
      ? abilityTrueScore
      : {
        score: ability.score,
        breakdown: [],
        ability: ability
      };

    for (const key of Object.keys(obj)) {
        const newObj: any = (<any>obj)[key];
        if (key === 'attributes') {
            if (Array.isArray(newObj)) {
              for (const attribute of newObj) {
                if (attribute.name === abilityName) {
                  abilityTrueScore.score += attribute.score;
                  abilityTrueScore.breakdown.push(attribute);
                }
              }
            } else if (typeof newObj === 'object') {
                console.log(newObj);
            }
        } else if (typeof newObj === 'object') {
            this.recursiveAttributeFindFromCharacterInterface(newObj, abilityName, ability, abilityTrueScore);
        }
    }

    return abilityTrueScore;
}

}
