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

  @Input() dimensions: Dimensions = new Dimensions(11, 11);
  @ViewChild('mapCanvas') mapCanvasElement: ElementRef;
  private mapCanvas: MapCanvas;

  constructor(_characterService: CharacterService) { }

  ngAfterViewInit(): void {
    this.mapCanvas = new MapCanvas(<HTMLCanvasElement>this.mapCanvasElement.nativeElement);
    this.mapCanvas.beginKeyboardEventCapture();
  }
}
