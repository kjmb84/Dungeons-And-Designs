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

    private determineValidMove(): boolean {

      return true;
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
