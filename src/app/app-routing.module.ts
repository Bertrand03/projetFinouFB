import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import {ChoixActionComponent} from './choix-action/choix-action.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {TrouveAnglaisComponent} from './trouve-anglais/trouve-anglais.component';
import {TrouveFrancaisComponent} from './trouve-francais/trouve-francais.component';
import {ToolsboxComponent} from './toolsbox/toolsbox.component';

const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'choix-action', component: ChoixActionComponent},
  { path: 'trouve-anglais', component: TrouveAnglaisComponent},
  { path: 'trouve-francais', component: TrouveFrancaisComponent},
  { path: 'toolsbox', component: ToolsboxComponent},
    {
    path: '**',
    redirectTo: 'authentification'
  }  // Si aucun lien trouvé ci-dessus alors redirection vers l'accueil.
];

// export const routes: Routes = [
//   {
//     path: 'employee',
//     component: EmployeeComponent
//   },
//
//   {
//     path: '**',
//     redirectTo: 'accueil'
//   }  // Si aucun lien trouvé ci-dessus alors redirection vers l'accueil.
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
