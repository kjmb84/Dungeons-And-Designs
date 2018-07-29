import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { MapCanvas } from './../../classes/map-canvas';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapCanvasBehaviorSubject: BehaviorSubject<MapCanvas> = new BehaviorSubject<MapCanvas>(null);
  private mapCanvas$: Observable<MapCanvas> = this.mapCanvasBehaviorSubject.asObservable();
  constructor() { }

  setMap(newMapCanvas: MapCanvas): void {
    this.mapCanvasBehaviorSubject.next(newMapCanvas);
  }

  getMap(): Observable<MapCanvas> {
    return this.mapCanvas$;
  }

}
