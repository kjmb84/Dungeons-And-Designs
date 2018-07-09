import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';

export class FocusCell {
    coordinates: MapCoordinates;
    history: MapCoordinates[] = [];
    canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(coordinates: MapCoordinates, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      this.coordinates = coordinates;
      this.context = context;
      this.canvas = canvas;
    }

    move(direction: MapSquareDirection): void {
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

      this.outline();
      console.log(this.history);
    }

    outline() {
      // this.context.globalCompositeOperation = 'destination-atop';
      this.context.rect(this.coordinates.x * this.coordinates.width,
                        this.coordinates.y * this.coordinates.height,
                        this.coordinates.width,
                        this.coordinates.height);

      this.context.lineWidth = 4;
      this.context.strokeStyle = 'rgba(0,255,0,0.7)';
      this.context.fillStyle = 'rgba(0,0,255,0.05)';

      this.context.fill();
      this.context.stroke();
    }

    clear(): void {
      // this.context.clearRect()
      // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
