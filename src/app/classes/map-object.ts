import { ServiceLocator } from './../services/service-locator';
import { MapService } from './../services/map/map.service';
import { MapCanvas } from './map-canvas';
import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';

export class MapObject {
  coordinates: MapCoordinates;
  history: MapCoordinates[];
  protected _mapService: MapService;
  mapCanvas: MapCanvas;

  constructor() {
    this._mapService = ServiceLocator.injector.get(MapService);
    this.mapCanvas = this._mapService.get();
  }

  move(direction: MapSquareDirection): void {
    const previousCell: MapCoordinates = Object.assign({}, this.coordinates);

    if (direction !== undefined) {
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
      if (this.validMove()) {
        this.history.push(previousCell);
      } else {
        this.coordinates = previousCell;
      }
    }
  }

  private validMove(): boolean {
    console.log(this.mapCanvas);

    let valid = false;

    if (this.coordinates.x > this.mapCanvas.dimensions.x || this.coordinates.y > this.mapCanvas.dimensions.y) {
      valid = true;
    }

    return valid;
  }
}
