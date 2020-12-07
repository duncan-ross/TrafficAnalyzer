import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import{NgxSliderModule} from '@angular-slider/ngx-slider'

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
