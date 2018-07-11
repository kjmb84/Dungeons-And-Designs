import { MapCell } from './map-cell';

export class MapCoordinates extends MapCell {

    moveLeft() {
      this.x++;
    }

    moveRight() {
      this.x--;
    }

    moveDown() {
      this.y++;
    }

    moveUp() {
      this.y--;
    }
}
