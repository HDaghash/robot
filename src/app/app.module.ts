import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ControlComponent } from './components/control/control.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],
  providers: [ControlComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
