import { ServiceLocator } from './../../../services/service-locator';
import { MapService } from './../../../services/map/map.service';
import { Dimensions } from './../../../classes/dimensions';
import { Component, ViewChild,
  ElementRef, AfterViewInit, Input } from '@angular/core';
import { MapCanvas } from '../../../classes/map-canvas';


@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})

export class MapGridComponent implements AfterViewInit {
  private _mapService: MapService;

  @Input() dimensions: Dimensions = new Dimensions(11, 11);
  @ViewChild('mapCanvas') mapCanvasElement: ElementRef;
  private mapCanvas: MapCanvas;

  constructor() {
    this._mapService = ServiceLocator.injector.get(MapService);
    this._mapService.getMap().subscribe(map => this.mapCanvas = map);
  }

  ngAfterViewInit(): void {
    this._mapService.setMap(new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement));
    this.mapCanvas.beginKeyboardEventCapture();
  }
}
