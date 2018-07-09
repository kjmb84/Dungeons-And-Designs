import { MapCanvas } from './../../classes/map-canvas';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  mapCanvas: MapCanvas;
  constructor() { }

  set(mapCanvas: MapCanvas) {
    this.mapCanvas = mapCanvas;
  }

  get(): MapCanvas {
    return this.mapCanvas;
  }


}
