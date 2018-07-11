import { Dimensions } from './dimensions';

export class MapCell extends Dimensions {
  width: number;
  height: number;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;

  constructor(dimensions: Dimensions, width: number, height: number, xCoordinate: number, yCoordinate: number) {
    super();
    this.width = width;
    this.height = height;
    this.xStart = width / dimensions.x * xCoordinate;
    this.xEnd = this.xStart + width / dimensions.x - 1;
    this.yStart = width / dimensions.y * yCoordinate;
    this.yEnd = this.yStart + width / dimensions.y - 1;
  }
}
