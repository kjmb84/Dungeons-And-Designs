import { Observable, of, Subject } from 'rxjs';
import { MapCanvas } from './../../classes/map-canvas';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapCanvas: Subject<MapCanvas> = new Subject<MapCanvas>();
  private mapCanvas$: Observable<MapCanvas> = this.mapCanvas.asObservable();
  constructor() { }

  set(newMapCanvas: MapCanvas): void {
    this.mapCanvas.next(newMapCanvas);
  }

  getMap(): Observable<MapCanvas> {
    return this.mapCanvas$;
  }

}
