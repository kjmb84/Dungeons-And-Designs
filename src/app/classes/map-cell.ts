import { Dimensions } from './dimensions';

export class MapCell extends Dimensions {
  width: number;
  height: number;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;

  constructor(params: MapCellConstructorProperties) {
    super();
    this.width = params.width;
    this.height = params.height;
    this.xStart = params.width / params.dimensions.x * params.xCoordinate;
    this.xEnd = this.xStart + params.width / params.dimensions.x - 1;
    this.yStart = params.width / params.dimensions.y * params.yCoordinate;
    this.yEnd = this.yStart + params.width / params.dimensions.y - 1;
    this.x = params.xCoordinate;
    this.y = params.yCoordinate;
  }
}

interface MapCellConstructorProperties {
  dimensions: Dimensions;
  width: number;
  height: number;
  xCoordinate: number;
  yCoordinate: number;

}