import { MapCell } from './map-cell';

export class MapCoordinates extends MapCell {

    moveLeft() {
      this.x++;
    }

    moveRight() {
      this.x--;
    }

    moveDown() {
      console.log(2);
      
      this.y++;
    }

    moveUp() {
      this.y--;
    }

    setCoordinates(coordinates: {x: number, y: number}): void {
      this.x = coordinates.x;
      this.y = coordinates.y;
    }
}
