import { HttpClient } from '@angular/common/http';
import { MapService } from './map/map.service';
import { CharacterService } from './character/character.service';

export const services: {[key: string]: {provide: any, deps: any[], useClass?: any}} = {
    'character': {
      provide: CharacterService,
      deps: [HttpClient]
    },
    'map': {
        provide: MapService,
        deps: []
    }
  };
