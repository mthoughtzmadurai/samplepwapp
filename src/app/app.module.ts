import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';
import { AuthGuard } from './services/auth.guard.service';
import { ArchitectService } from './services/architect.service';
import { BuildingService } from './services/building.service';
import { HttpClientService } from './services/http-client.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/_global/nav-bar/nav-bar.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { OAuthModule } from 'angular-oauth2-oidc';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';
import 'hammerjs';

import {
  OverlayPanelModule,
  MultiSelectModule,
  DataTableModule,
  SharedModule,
  ListboxModule,
  EditorModule
} from 'primeng/primeng';
// PrimeNG forgot to add shortcode for SidebarModule, add it in separately for now
import { SidebarModule } from 'primeng/components/sidebar/sidebar';

import { HomeComponent } from './components/home/home.component';
import { ArchitectComponent } from './components/architect/architect.component';
import { BuildingComponent } from './components/building/building.component';
import { CardComponent } from './components/architect/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PrivacyPolicyComponent,
    HomeComponent,
    ArchitectComponent,
    BuildingComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    CookieLawModule,
    HttpModule,
    HttpClientModule,
    OverlayPanelModule,
    MultiSelectModule,
    DataTableModule,
    SharedModule,
    ListboxModule,
    EditorModule,
    SidebarModule,
    OAuthModule.forRoot()
  ],
  providers: [HttpClientService, GoogleAnalyticsEventsService, AuthGuard, ArchitectService, BuildingService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
