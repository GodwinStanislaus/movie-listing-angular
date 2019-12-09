import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxBootstrapSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
