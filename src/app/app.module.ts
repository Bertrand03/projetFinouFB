import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ChoixActionComponent} from './components/choix-action/choix-action.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TrouveAnglaisComponent } from './components/trouve-anglais/trouve-anglais.component';
import { TrouveFrancaisComponent } from './components/trouve-francais/trouve-francais.component';
import { ToolsboxComponent } from './components/toolsbox/toolsbox.component';
import { AideComponent } from './components/aide/aide.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoixActionComponent,
    AuthentificationComponent,
    NavBarComponent,
    TrouveAnglaisComponent,
    TrouveFrancaisComponent,
    ToolsboxComponent,
    AideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
