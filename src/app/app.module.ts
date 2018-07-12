import { services } from './services/services';
import { ServiceLocator } from './services/service-locator';
import { MapService } from './services/map/map.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterViewComponent } from './components/character/character-view/character-view.component';
import { CharacterService } from './services/character/character.service';
import { AbilityTrueScorePipe } from './pipes/ability-true-score.pipe';
import { MapGridComponent } from './components/map/map-grid/map-grid.component';
import { MapSquareComponent } from './components/map/map-square/map-square.component';

const components = [
    CharacterViewComponent
];

const serviceProviders = [
    CharacterService,
    MapService
];

const pipes = [
  AbilityTrueScorePipe
];

@NgModule({
  declarations: [
    AppComponent,
    components,
    pipes,
    MapGridComponent,
    MapSquareComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [serviceProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.initializeStaticServiceInjector();
  }

  initializeStaticServiceInjector() {
    ServiceLocator.injector = Injector.create(
      Object.keys(services).map(key => ({
        provide: services[key].provide,
        useClass: services[key].provide,
        deps: services[key].deps
      }))
    );
  }
}
