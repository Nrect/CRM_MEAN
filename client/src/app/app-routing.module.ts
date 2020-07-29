import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {ClientsPageComponent} from "./clients-page/clients-page.component";
import {ClientFormComponent} from "./client-form/client-form.component";
import {ModalInfoComponent} from "./shared/components/modal-info/modal-info.component";
import {LoginAuditorComponent} from "./login-auditor/login-auditor.component";
import {OrganizationsComponent} from "./organizations/organizations.component";
import {AuditorLayoutComponent} from "./shared/layouts/auditor-layout/auditor-layout.component";


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'clients', component: ClientsPageComponent},
      {path: 'clients/new', component: ClientFormComponent},
      {path: 'clients/:id', component: ClientFormComponent},

    ]
  },
  {path: 'auditor', component: LoginAuditorComponent},
  {path: 'organizations', canActivate: [AuthGuard], component: OrganizationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
