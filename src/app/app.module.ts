import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from './shared.module';
import { EnvService } from './env.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LoginModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (envService: EnvService) => () => envService.init(),
    deps: [EnvService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    library.add(fas);
  }
}
