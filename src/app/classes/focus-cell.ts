import { MapCanvas } from './map-canvas';
import { MapService } from './../services/map/map.service';
import { ServiceLocator } from './../services/service-locator';
import { MapObject } from './map-object';
import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';

export class FocusCell extends MapObject {
    constructor(coordinates: MapCoordinates) {
      super(coordinates);
    }

    moveFocusCell(direction: MapSquareDirection): void {
      this.move(direction);
      this.draw();
    }

    draw(): void {
      this.mapCanvas.clear();
      this.outline();
      this.fill(this.coordinates);
      this.fillHistory();
    }

    outline(): void {
      this.mapCanvas.getContext().beginPath();
      this.createRectFromCoordinates(this.coordinates);

      this.mapCanvas.getContext().lineWidth = 4;
      this.mapCanvas.getContext().strokeStyle = 'rgba(0,255,0,0.7)';
      this.mapCanvas.getContext().fillStyle = 'rgba(0,0,255,0.05)';

      this.mapCanvas.getContext().fill();
      this.mapCanvas.getContext().stroke();
    }

    private fill(cell: MapCoordinates): void {
      this.mapCanvas.getContext().beginPath();
      this.createRectFromCoordinates(cell);
      this.mapCanvas.getContext().fillStyle = 'rgba(0,0,255,0.05)';
      this.mapCanvas.getContext().fill();
    }

    private fillHistory(): void {
      this.history.forEach(cell => {
        this.fill(cell);
      });
    }

    private createRectFromCoordinates(cell: MapCoordinates): void {
      this.mapCanvas.getContext().rect(cell.x * cell.width,
                                       cell.y * cell.height,
                                       cell.width,
                                       cell.height);
      }
  }
