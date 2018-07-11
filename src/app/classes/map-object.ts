import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';

export class MapObject {
  coordinates: MapCoordinates;
  history: MapCoordinates[];

  move(direction: MapSquareDirection): MapCoordinates {
  const previousCell: MapCoordinates = Object.assign({}, this.coordinates);
  if (direction !== undefined) {
    this.history.push(previousCell);
    switch (direction) {
      case MapSquareDirection.ArrowDown:
        this.coordinates.moveDown();
        break;
      case MapSquareDirection.ArrowRight:
        this.coordinates.moveLeft();
        break;
      case MapSquareDirection.ArrowUp:
        this.coordinates.moveUp();
        break;
      case MapSquareDirection.ArrowLeft:
        this.coordinates.moveRight();
        break;
    }
  }
}
