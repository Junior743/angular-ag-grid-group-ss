import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { LicenseManager } from "ag-grid-enterprise";
import { HttpClientModule } from '@angular/common/http';

import 'ag-grid-enterprise';


LicenseManager.setLicenseKey(environment.agGridLicenseKey);


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}