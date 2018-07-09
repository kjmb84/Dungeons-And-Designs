import { Dimensions } from './../../../classes/dimensions';
import { CharacterService } from '../../../services/character/character.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild,
  ElementRef, AfterViewInit, OnChanges, Input } from '@angular/core';
import { MapSquareDirection } from '../../../enums/map-square-directions';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { MapCanvas } from '../../../classes/map-canvas';


@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent implements AfterViewInit {

  private _characterService: CharacterService;

  @Input() dimensions: Dimensions = new Dimensions(11, 11);
  @ViewChild('mapCanvas') mapCanvasElement: ElementRef;
  private mapCanvas: MapCanvas;

  constructor(_characterService: CharacterService) { }

  ngAfterViewInit(): void {
    this.mapCanvas = new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement);
    this.mapCanvas.beginKeyboardEventCapture();
  }
}

  // setCellDirection(cell: MapCoordinates, direction: MapSquareDirection) {
  //   const xStart = this.cellWidth * cell.x + 0.5 * this.cellWidth;
  //   const yStart = this.cellHeight * cell.y + 0.5 * this.cellHeight;
  //   const xEnd = this.canvas.width / this.dimensions.x * (cell.x + 1)  + 0.5 * this.cellWidth;
  //   const yEnd = this.canvas.height / this.dimensions.y * (cell.y + 1)  + 0.5 * this.cellHeight;

  //   this.context.beginPath();
  //   this.context.moveTo(xStart, yStart);
  //   this.context.lineTo(xEnd, yEnd);
  //   this.context.stroke();
  // }



// class MapCanvas {

//   public canvas: HTMLCanvasElement;
//   private context: CanvasRenderingContext2D;

//   private cellWidth: number;
//   private cellHeight: number;

//   private cellInFocus: FocusCell;
//   private mapCells: MapCell[] = [];

//   dimensions: Dimensions = new Dimensions(11, 11);

//   constructor(mapCanvas: HTMLCanvasElement) {
//     this.setCanvasAndContext(mapCanvas);
//     this.setCellDimensions();
//     this.initializeCanvas();
//     this.initializeMapCells();
//     this.initializeFocusCell();
//   }

//   getMapCenter(): MapCoordinates {
//     return new MapCoordinates
//       (
//         this.dimensions,
//         this.cellWidth,
//         this.cellHeight,
//         Math.floor(this.dimensions.x / 2),
//         Math.floor(this.dimensions.y / 2)
//       );
//   }

//   beginKeyboardEventCapture(): void {
//     const keyDown = Observable.fromEvent(this.canvas, 'keydown');
//     const keyPress = Observable.fromEvent(this.canvas, 'keyPress');

//     keyPress
//       .subscribe((ke: KeyboardEvent) => {
//         this.clear();
//         this.cellInFocus.move(MapSquareDirection[ke.code]);
//       });

//     keyDown
//       .debounceTime(100)
//       .subscribe((ke: KeyboardEvent) => {
//         this.clear();
//         this.cellInFocus.move(MapSquareDirection[ke.code]);
//       });

//   }

//   initializeFocusCell(): void {
//     this.cellInFocus = new FocusCell(this.getMapCenter(), this.context, this.canvas);

//     // TODO: figure out why these two lines are necessary
//     this.cellInFocus.coordinates.x = Math.floor(this.dimensions.x / 2);
//     this.cellInFocus.coordinates.y = Math.floor(this.dimensions.y / 2);
//     this.cellInFocus.outline();
//   }


//   private initializeMapCells() {
//     for (let i = 0; i < this.dimensions.x; i++) {
//       for (let j = 0; j < this.dimensions.y; j++) {
//         this.mapCells.push(new MapCell(this.dimensions, this.cellWidth, this.cellHeight, i, j));
//       }
//     }
//   }

//   private setCanvasAndContext(canvas: HTMLCanvasElement): void {
//     this.canvas = canvas;
//     this.context = this.canvas.getContext('2d');
//   }

//   clear(): void {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   private initializeCanvas(): void {
//     const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
//         <defs> \
//             <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse"> \
//                 <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5" /> \
//             </pattern> \
//             <pattern id="gridWithSmallGrid" width="80" height="80" patternUnits="userSpaceOnUse"> \
//                 <rect width="80" height="80" fill="url(#smallGrid)" /> \
//                 <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
//             </pattern> \
//             <pattern id="grid" width="${this.cellWidth}" height="${this.cellHeight}"
//               patternUnits="userSpaceOnUse"> \
//                 <path d="M ${this.cellWidth} 0 L 0 0 0 ${this.cellHeight}"
//                   fill="none" stroke="gray" stroke-width="1" /> \
//             </pattern> \
//         </defs> \
//         <rect width="100%" height="100%" fill="url(#grid)" /> \
//     </svg>`;

//     const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
//     const url = URL.createObjectURL(svg);

//     this.canvas.style.backgroundImage = `url('${url}')`;
//   }

//   private setCellDimensions(): void {
//     this.cellWidth = this.canvas.width / this.dimensions.x;
//     this.cellHeight = this.canvas.height / this.dimensions.y;
//   }
// }

// class Dimensions {
//   x: number;
//   y: number;

//   constructor(x?: number, y?: number) {
//     this.x = x;
//     this.y = y;
//   }
// }

// class MapCell extends Dimensions {
//   width: number;
//   height: number;
//   xStart: number;
//   xEnd: number;
//   yStart: number;
//   yEnd: number;

//   constructor(dimensions: Dimensions, width: number, height: number, xCoordinate: number, yCoordinate: number) {
//     super();
//     this.width = width;
//     this.height = height;
//     this.xStart = width / dimensions.x * xCoordinate;
//     this.xEnd = this.xStart + width / dimensions.x - 1;
//     this.yStart = width / dimensions.y * yCoordinate;
//     this.yEnd = this.yStart + width / dimensions.y - 1;
//   }
// }

// class MapCoordinates extends MapCell {

//   moveLeft() {
//     this.x++;
//   }

//   moveRight() {
//     this.x--;
//   }

//   moveDown() {
//     this.y++;
//   }

//   moveUp() {
//     this.y--;
//   }
// }

// class FocusCell {
//   coordinates: MapCoordinates;
//   history: MapCoordinates[] = [];
//   canvas: HTMLCanvasElement;
//   private context: CanvasRenderingContext2D;

//   constructor(coordinates: MapCoordinates, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
//     this.coordinates = coordinates;
//     this.context = context;
//     this.canvas = canvas;
//   }

//   move(direction: MapSquareDirection): void {
//     const previousCell: MapCoordinates = Object.assign({}, this.coordinates);
//     if (direction !== undefined) {
//       this.history.push(previousCell);
//       switch (direction) {
//         case MapSquareDirection.ArrowDown:
//           this.coordinates.moveDown();
//           break;
//         case MapSquareDirection.ArrowRight:
//           this.coordinates.moveLeft();
//           break;
//         case MapSquareDirection.ArrowUp:
//           this.coordinates.moveUp();
//           break;
//         case MapSquareDirection.ArrowLeft:
//           this.coordinates.moveRight();
//           break;
//       }
//     }

//     this.outline();
//     console.log(this.history);
//   }

//   outline() {
//     // this.context.globalCompositeOperation = 'destination-atop';
//     this.context.rect(this.coordinates.x * this.coordinates.width,
//                       this.coordinates.y * this.coordinates.height,
//                       this.coordinates.width,
//                       this.coordinates.height);
//     this.context.lineWidth = 4;

//     this.context.strokeStyle = 'rgba(0,255,0,0.7)';
//     this.context.fillStyle = 'rgba(0,0,255,0.05)';

//     this.context.fill();
//     this.context.stroke();
//   }

//   clear(): void {
//     // this.context.clearRect()
//     // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }
// }

class MapObject {
  coordinates: MapCoordinates;
}
