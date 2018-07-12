import { MapService } from './../../../services/map/map.service';
import { Dimensions } from './../../../classes/dimensions';
import { CharacterService } from '../../../services/character/character.service';
import { Component, ViewChild,
  ElementRef, AfterViewInit, Input } from '@angular/core';
import { MapCanvas } from '../../../classes/map-canvas';


@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.css']
})

export class MapGridComponent implements AfterViewInit {

  private _characterService: CharacterService;
  private _mapService: MapService;

  @Input() dimensions: Dimensions = new Dimensions(11, 11);
  @ViewChild('mapCanvas') mapCanvasElement: ElementRef;
  private mapCanvas: MapCanvas;

  constructor(characterService: CharacterService, mapService: MapService) {
    this._characterService = characterService;
    this._mapService = mapService;
  }

  ngAfterViewInit(): void {
    // if (!(this.mapCanvas = this._mapService.getMap())) {
    //   this.mapCanvas = this._mapService.set(new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement));
    // }
    this._mapService.set(new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement));
    this._mapService.getMap().subscribe(map => {
      this.mapCanvas = map;
    });
    // this.mapCanvas = new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement);
    this.mapCanvas.beginKeyboardEventCapture();
  }
}
