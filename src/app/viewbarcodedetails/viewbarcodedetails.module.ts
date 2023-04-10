import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewbarcodedetailsPageRoutingModule } from './viewbarcodedetails-routing.module';

import { ViewbarcodedetailsPage } from './viewbarcodedetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewbarcodedetailsPageRoutingModule
  ],
  declarations: [ViewbarcodedetailsPage]
})
export class ViewbarcodedetailsPageModule {}
