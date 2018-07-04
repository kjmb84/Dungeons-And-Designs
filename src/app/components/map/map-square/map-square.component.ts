import { mapSquareDirections } from './../../../enums/map-square-directions';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-square',
  templateUrl: './map-square.component.html',
  styleUrls: ['./map-square.component.css']
})
export class MapSquareComponent implements OnInit {

  @Input() directionType: mapSquareDirections;

  constructor() { }

  ngOnInit() {
  }

}
