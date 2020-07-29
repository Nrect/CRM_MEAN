import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ClientsPageComponent } from './clients-page/clients-page.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { ModalInfoComponent } from './shared/components/modal-info/modal-info.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ClientsFilterComponent } from './clients-page/clients-filter/clients-filter.component';
import { ClientFormComponent } from './client-form/client-form.component';
import {SearchPipe} from "./shared/pipes/search.pipe";
import { LoginAuditorComponent } from './login-auditor/login-auditor.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { AuditorLayoutComponent } from './shared/layouts/auditor-layout/auditor-layout.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ClientsPageComponent,
    ModalInfoComponent,
    ClientsFilterComponent,
    ClientFormComponent,
    SearchPipe,
    LoginAuditorComponent,
    OrganizationsComponent,
    AuditorLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
