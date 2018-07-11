import { MapCanvas } from './../../classes/map-canvas';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapCanvas: MapCanvas = null;
  constructor() { }

  set(mapCanvas: MapCanvas): MapCanvas {
    this.mapCanvas = mapCanvas;
    return this.mapCanvas;
  }

  get(): MapCanvas {
    return this.mapCanvas;
  }

}
