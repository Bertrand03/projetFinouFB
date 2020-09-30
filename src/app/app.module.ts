import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import {ChoixActionComponent} from './choix-action/choix-action.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './authentification/authentification.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TrouveAnglaisComponent } from './trouve-anglais/trouve-anglais.component';
import { TrouveFrancaisComponent } from './trouve-francais/trouve-francais.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ChoixActionComponent,
    AuthentificationComponent,
    NavBarComponent,
    TrouveAnglaisComponent,
    TrouveFrancaisComponent
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
