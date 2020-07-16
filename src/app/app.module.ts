import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { UiServeItemComponent } from './ui-serve-item/ui-serve-item.component';
import { UiServeStationComponent } from './ui-serve-station/ui-serve-station.component';
import { AboutComponent } from './about/about.component';
import { PlayComponent } from './play/play.component';


@NgModule({
  declarations: [
    AppComponent,
    UiServeItemComponent,
    UiServeStationComponent,
    AboutComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatProgressBarModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
