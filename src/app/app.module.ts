import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterViewComponent } from './components/character/character-view/character-view.component';
import { CharacterService } from './services/character.service';
import { AbilityTrueScorePipe } from './pipes/ability-true-score.pipe';
import { MapGridComponent } from './components/map/map-grid/map-grid.component';
import { MapSquareComponent } from './components/map/map-square/map-square.component';

const components = [
    CharacterViewComponent
];

const services = [
    CharacterService
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
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
