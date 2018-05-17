import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterViewComponent } from './components/character/character-view/character-view.component';
import { CharacterService } from './services/character.service';
import { AbilityTrueScorePipe } from './pipes/ability-true-score.pipe';

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
    pipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
