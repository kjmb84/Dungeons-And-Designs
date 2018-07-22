import { MapSquareDirection } from './../enums/map-square-directions';
import { MapCoordinates } from './map-coordinates';
import { MapCell } from './map-cell';
import { FocusCell } from './focus-cell';
import { Dimensions } from './dimensions';
import { fromEvent, merge } from '../../../node_modules/rxjs';

export class MapCanvas {
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private cellWidth: number;
  private cellHeight: number;

  private cellInFocus: FocusCell;
  private mapCells: MapCell[] = [];

  dimensions: Dimensions = new Dimensions(11, 11);

  constructor(mapCanvas: HTMLCanvasElement) {
    this.setCanvasAndContext(mapCanvas);
    this.setCellDimensions();
    this.initializeCanvas();
    this.initializeMapCells();
    this.initializeFocusCell();
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  beginKeyboardEventCapture(): void {
    const keyDown = fromEvent(this.canvas, 'keydown');
    const keyPress = fromEvent(this.canvas, 'keypress');

    const keyEvents = merge(keyDown, keyPress)
                        .subscribe((ke: KeyboardEvent) => {
                          console.log(ke);

                          this.clear();
                          this.cellInFocus.move(MapSquareDirection[ke.code]);
                        });
    console.log(keyEvents);

  }

  getMapCenter(): MapCoordinates {
    return new MapCoordinates
      (
        this.dimensions,
        this.cellWidth,
        this.cellHeight,
        Math.floor(this.dimensions.x / 2),
        Math.floor(this.dimensions.y / 2)
      );
  }

  private initializeCanvas(): void {
    const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="gridWithSmallGrid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
            <pattern id="grid" width="${this.cellWidth}" height="${this.cellHeight}"
              patternUnits="userSpaceOnUse"> \
                <path d="M ${this.cellWidth} 0 L 0 0 0 ${this.cellHeight}"
                  fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
    </svg>`;

    const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svg);

    this.canvas.style.backgroundImage = `url('${url}')`;
  }

  private initializeFocusCell(): void {
      this.cellInFocus = new FocusCell(this.getMapCenter(), this.context);
      this.cellInFocus.outline();
  }

  private initializeMapCells(): void {
    for (let i = 0; i < this.dimensions.x; i++) {
      for (let j = 0; j < this.dimensions.y; j++) {
        this.mapCells.push(new MapCell(this.dimensions, this.cellWidth, this.cellHeight, i, j));
      }
    }
  }

  private setCanvasAndContext(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  private setCellDimensions(): void {
    this.cellWidth = this.canvas.width / this.dimensions.x;
    this.cellHeight = this.canvas.height / this.dimensions.y;
  }
}
