import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import {ChoixActionComponent} from './choix-action/choix-action.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent},
  { path: 'choix-action', component: ChoixActionComponent}
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
