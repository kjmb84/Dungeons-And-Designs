import IAttribute from './IAttribute';

export default interface IFeat {
    name: string;
    description: string;
    perks: [string];
    attributes: [IAttribute];
}