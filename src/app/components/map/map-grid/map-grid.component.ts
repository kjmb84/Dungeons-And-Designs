import { Component, OnInit, ViewChild,
  ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { mapSquareDirection } from '../../../enums/map-square-directions';

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dimensions: MapDimensions = {x: 11, y: 11};
  private cellWidth: number;
  private cellHeight: number;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>this.mapCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.cellWidth = this.canvas.width / this.dimensions.x;
    this.cellHeight = this.canvas.height / this.dimensions.y;

    this.initializeCanvas(this.context);
  }

  ngOnChanges(): void {
  }

  initializeCanvas(context: CanvasRenderingContext2D): void {
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

    const img = new Image();
    const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svg);

    img.onload = function () {
      context.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  readMapCell(): void {
    
  }

  setCellDirection(cell: MapCoordinates, direction: mapSquareDirection) {
    const xStart = this.cellWidth * cell.x + 0.5 * this.cellWidth;
    const yStart = this.cellHeight * cell.y + 0.5 * this.cellHeight;
    const xEnd = this.canvas.width / this.dimensions.x * (cell.x + 1)  + 0.5 * this.cellWidth;
    const yEnd = this.canvas.height / this.dimensions.y * (cell.y + 1)  + 0.5 * this.cellHeight;

    this.context.beginPath();
    this.context.moveTo(xStart, yStart);
    this.context.lineTo(xEnd, yEnd);
    this.context.stroke();
  }

  clearMapCell(): void {

  }

}

interface MapDimensions {
  x: number;
  y: number;
}

interface MapCoordinates {
  x: number;
  y: number;
}
