import { MapObject } from './map-object';
import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';

export class FocusCell extends MapObject {
    history: MapCoordinates[] = [];
    private context: CanvasRenderingContext2D;

    constructor(coordinates: MapCoordinates, context: CanvasRenderingContext2D) {
      super(coordinates);
      this.context = context;
    }

    moveFocusCell(direction: MapSquareDirection): void {
      this.move(direction);
      this.outline();
      this.fillHistory();
    }

    outline(): void {
      this.context.beginPath();
      this.createRectFromCoordinates(this.coordinates);

      this.context.lineWidth = 4;
      this.context.strokeStyle = 'rgba(0,255,0,0.7)';
      this.context.fillStyle = 'rgba(0,0,255,0.05)';

      this.context.fill();
      this.context.stroke();
    }

    private fill(cell: MapCoordinates): void {
      this.context.beginPath();
      this.createRectFromCoordinates(cell);
      this.context.fillStyle = 'rgba(0,0,255,0.05)';
      this.context.fill();
    }

    private fillHistory(): void {
      this.history.forEach(cell => {
        this.fill(cell);
      });
    }

    private createRectFromCoordinates(cell: MapCoordinates): void {
      this.context.rect(cell.x * cell.width,
                        cell.y * cell.height,
                        cell.width,
                        cell.height);
      }
  }
