import { Component, OnInit, ViewChild,
  ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})
export class MapGridComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  public canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dimensions: MapDimensions = new MapDimensions();


  constructor() { }

  ngOnInit() {
    this.dimensions.x = 10;
    this.dimensions.y = 10;
  }

  ngAfterViewInit(): void {
    this.canvas = <HTMLCanvasElement>this.mapCanvas.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.initializeCanvas(this.context);

    const mapCoordinates = new MapCoordinates();
    mapCoordinates.x = 2;
    mapCoordinates.y = 6;
    this.updateMapCell(mapCoordinates);
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
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" /> \
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

  updateMapCell(cell: MapCoordinates): void {
    const xStart = this.canvas.width / this.dimensions.x * cell.x;
    const yStart = this.canvas.height / this.dimensions.y * cell.y;
    const xEnd = this.canvas.width / this.dimensions.x * (cell.x + 1);
    const yEnd = this.canvas.height / this.dimensions.y * (cell.y + 1);

    this.context.beginPath();
    this.context.moveTo(xStart, yStart);
    this.context.lineTo(xEnd, yEnd);
    this.context.stroke();
  }

  clearMapCell(): void {

  }

}

// interface MapSquare {
//   update();
// }

// class MapArrow implements MapSquare {
//   update(): void {

//   }
// }

class MapDimensions {
  x: number;
  y: number;
}

class MapCoordinates {
  x: number;
  y: number;
}