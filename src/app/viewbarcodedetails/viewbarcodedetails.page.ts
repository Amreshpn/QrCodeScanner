import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../services/navparam.services';
import { NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-viewbarcodedetails',
  templateUrl: './viewbarcodedetails.page.html',
  styleUrls: ['./viewbarcodedetails.page.scss'],
})
export class ViewbarcodedetailsPage implements OnInit {

  barcoadData: any;
  constructor(
    private navparamsrv: NavparamService,
    private navCtrl: NavController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    debugger;
    if (this.navparamsrv.getNavData() !== 0) {
      this.barcoadData = this.navparamsrv.getNavData();
    }
  }

  sharedata() {
    let barcodeData = this.barcoadData;
    let options = {
      message: barcodeData,
      subject: 'Barcode Data',
      chooserTitle: 'Share Barcode Data'
    }
    this.socialSharing.shareWithOptions(options).then(() => {
      console.log("Barcode data shared successfully");
    }).catch((err) => {
      console.log("Error sharing barcode data: ", err);
    });

  }
}
