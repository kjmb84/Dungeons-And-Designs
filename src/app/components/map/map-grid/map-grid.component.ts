import { CharacterService } from './../../../services/character.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild,
  ElementRef, AfterViewInit, OnChanges, Input } from '@angular/core';
import { MapSquareDirection } from '../../../enums/map-square-directions';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent implements OnInit, AfterViewInit, OnChanges {

  private _characterService: CharacterService;

  @Input() dimensions: Dimensions = new Dimensions(10, 10);
  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private cellWidth: number;
  private cellHeight: number;

  private cellInFocus: FocusCell = new FocusCell();
  private mapCells: MapCell[] = [];

  constructor(_characterService: CharacterService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>this.mapCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.cellWidth = this.canvas.width / this.dimensions.x;
    this.cellHeight = this.canvas.height / this.dimensions.y;

    this.initializeCanvas();
    this.initializeMapCells();
    this.captureEvents(this.canvas);
    this.setCellInFocusOutline();
  }

  ngOnChanges(): void {
  }

  initializeCanvas(): void {
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

    this.cellInFocus.x = Math.floor(this.dimensions.x / 2);
    this.cellInFocus.y = Math.floor(this.dimensions.y / 2);
  }

  private initializeMapCells() {
    for (let i = 0; i < this.dimensions.x; i++) {
      for (let j = 0; j < this.dimensions.y; j++) {
        this.mapCells.push(new MapCell(this.dimensions, this.cellWidth, this.cellHeight, i, j));
      }
    }
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    const keyDown = Observable.fromEvent(canvasEl, 'keydown');

    const keyPresses = keyDown
      .debounceTime(100)
      .subscribe((a: KeyboardEvent) => {
        this.clear();
        this.setNewCellInFocus(MapSquareDirection[a.code]);
        this.setCellInFocusOutline();
      });
  }

  readMapCell(): void {
  }

  setCellDirection(cell: MapCoordinates, direction: MapSquareDirection) {
    const xStart = this.cellWidth * cell.x + 0.5 * this.cellWidth;
    const yStart = this.cellHeight * cell.y + 0.5 * this.cellHeight;
    const xEnd = this.canvas.width / this.dimensions.x * (cell.x + 1)  + 0.5 * this.cellWidth;
    const yEnd = this.canvas.height / this.dimensions.y * (cell.y + 1)  + 0.5 * this.cellHeight;

    this.context.beginPath();
    this.context.moveTo(xStart, yStart);
    this.context.lineTo(xEnd, yEnd);
    this.context.stroke();
  }

  setNewCellInFocus(direction: MapSquareDirection): void {
    // TODO figure out more elegant way to pass previous cell by value instead of reference
    const previousCell: MapCoordinates = new MapCoordinates(this.cellInFocus.x, this.cellInFocus.y);
    if (direction !== undefined) {
      this.cellInFocus.history.push(previousCell);
      switch (direction) {
        case MapSquareDirection.ArrowDown:
          this.cellInFocus.incrementY();
          break;
        case MapSquareDirection.ArrowRight:
          this.cellInFocus.incrementX();
          break;
        case MapSquareDirection.ArrowUp:
          this.cellInFocus.decrementY();
          break;
        case MapSquareDirection.ArrowLeft:
          this.cellInFocus.decrementX();
          break;
      }
    }
      console.log(this.cellInFocus.history);
  }

  setCellInFocusOutline(): void {
    // this.context.globalCompositeOperation = 'destination-atop';
    this.context.rect(this.cellInFocus.x * this.cellWidth, this.cellInFocus.y * this.cellHeight, this.cellWidth, this.cellHeight);
    this.context.lineWidth = 4;

    this.context.strokeStyle = 'rgba(0,255,0,0.7)';
    this.context.fillStyle = 'rgba(0,0,255,0.05)';

    this.context.fill();
    this.context.stroke();
  }

  setCellInFocusHistoryOutline(): void {

  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}



class Dimensions {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }
}

class MapCell {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;

  constructor(dimensions: Dimensions, width: number, height: number, xCoordinate: number, yCoordinate: number) {
    this.xStart = width / dimensions.x * xCoordinate;
    this.xEnd = this.xStart + width / dimensions.x - 1;
    this.yStart = width / dimensions.y * yCoordinate;
    this.yEnd = this.yStart + width / dimensions.y - 1;
  }

  
}

class MapCoordinates extends Dimensions {

  incrementX() {
    this.x++;
  }

  decrementX() {
    this.x--;
  }

  incrementY() {
    this.y++;
  }

  decrementY() {
    this.y--;
  }
}

class FocusCell extends MapCoordinates {
  history: Dimensions[] = [];
}
