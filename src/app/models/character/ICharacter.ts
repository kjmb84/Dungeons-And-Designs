import IAbility from './IAbility';
import IAlignment from './IAlignment';
import IBackground from './IBackground';
import IDeathSaves from './IDeathSaves';
import IFeat from './IFeat';
import IHP from './IHP';
import ISkill from './ISkill';
import IWallet from './IWallet';

export default interface ICharacter {
    abilities: [IAbility];
    age: number;
    alignment: IAlignment;
    background: IBackground;
    deathSaves: IDeathSaves;
    experience: number;
    feats: [IFeat];
    height: number;
    HP: IHP;
    name: string;
    personalityTraits: [string];
    skills: [ISkill];
    speed: number;
    vision: number;
    wallet: IWallet;
    weight: number;
}