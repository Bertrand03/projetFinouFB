import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChoixActionComponent} from './components/choix-action/choix-action.component';
import {AuthentificationComponent} from './components/authentification/authentification.component';
import {TrouveAnglaisComponent} from './components/trouve-anglais/trouve-anglais.component';
import {TrouveFrancaisComponent} from './components/trouve-francais/trouve-francais.component';
import {ToolsboxComponent} from './components/toolsbox/toolsbox.component';

const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent},
  { path: 'choix-action', component: ChoixActionComponent},
  { path: 'trouve-anglais', component: TrouveAnglaisComponent},
  { path: 'trouve-francais', component: TrouveFrancaisComponent},
  { path: 'toolsbox', component: ToolsboxComponent},
    {
    path: '**',
    redirectTo: 'authentification'
  }  // Si aucun lien trouvé ci-dessus alors redirection vers l'accueil.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
