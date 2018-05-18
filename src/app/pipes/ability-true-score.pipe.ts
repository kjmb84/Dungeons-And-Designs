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
      // console.log(upgradedAbility);
      // this.abilityTrueScores.push(this.recursiveAttributeFindFromCharacterInterface(ability.name, character, ability));
    }
    console.log(this.abilityTrueScores);

    return this.abilityTrueScores;
  }

  recursiveAttributeFindFromCharacterInterface(abilityName, obj: Object, ability, abilityTrueScore) {
    if (!abilityTrueScore.score) {
      abilityTrueScore = {
        score: ability.score,
        breakdown: [],
      };
    }

    const keys = Object.keys(obj);

    console.log(keys);
      // console.log(Object.keys(obj));
        // this.recursiveAttributeFindFromCharacterInterface(abilityName, obj, ability, abilityTrueScore);

      // for (const key of Object.keys(obj)) {
      //   const subObject: any = (<any>obj)[key];
        
        // if (key === 'attributes') {
          // console.log('attribute');
          // if (Array.isArray(subObject)) {
          //   for (const attribute of subObject) {
          //     if (attribute.name === abilityName) {
          //       // console.log('it\'s a match', abilityName);
          //     }
          //   }
          // } else if (typeof subObject === 'object') {
          //   // console.log('subobject', subObject);
          // }
        // } else if (typeof subObject === 'object') {
          // console.log('non-attribute', subObject);
          
          // this.recursiveAttributeFindFromCharacterInterface(subObject, abilityName, ability, abilityTrueScore);
        // }
      // }



      const x = true;
      if (x) { return 0; }


    // for (const key of Object.keys(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newObj: any = (<any>obj)[key];
        console.log(key);
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
    }

    return abilityTrueScore;
}

}
