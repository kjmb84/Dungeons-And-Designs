import IAttribute from './IAttribute';
import ILanguage from './ILanguage';

export default interface IBackground {
    attributes: [IAttribute];
    description: string;
    name: string;
    languages: [ILanguage];
    toolProficiencies: [string];
}