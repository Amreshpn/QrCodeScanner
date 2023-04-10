import { Component, ElementRef } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NavparamService } from 'src/app/services/navparam.services';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


import { ViewChild } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  @ViewChild('barcode', { static: true }) barcode: ElementRef;
  note: any;

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  values: any;
  QrcodeText: any;
  qrCodeDataUrl: string;
  isshown: boolean;

  constructor(
    public alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private navparamsrv: NavparamService,
    private navCtrl: NavController,
    private socialSharing: SocialSharing,
   
  ) {

    this.QrcodeText = "";
    this.isshown = false;
  }

  ngOnInit() {

  }


  showalert(msg) {
    this.alertController.create({
      header: 'QR Code Scanner',
      message: msg,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417,CODE_39,UPC_A,CODE_128,AZTEC,CODE_93,ITF,,UPC_E,DATA_MATRIX,MAXICODE*,RSS_14*,RSS_EXPANDED*',
      orientation: 'portrait',
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
    
      torchOn: false,
      resultDisplayDuration: 500,
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;
      this.values = barcodeData.text;
      this.navparamsrv.clearNavData();
      this.navparamsrv.setNavData(this.values);
      this.navCtrl.navigateForward('viewbarcodedetails');
    });
  }

  generatebarcode() {
    QRCode.toDataURL(this.QrcodeText)
      .then((dataUrl: string) => {
        // Show QR code
        this.qrCodeDataUrl = dataUrl;
        this.isshown = true;
      })
      .catch((error: any) => console.error(error));
  }

  sharedata() {
    this.socialSharing.share(null, null, this.qrCodeDataUrl, null).then(() => {
      this.showalert("Barcode data shared successfully")
    }).catch((err) => {
      this.showalert(err)
    });
  }

  logOut() {
    this.navCtrl.navigateRoot("login");
    window.localStorage.removeItem("LoginState")
  }
}
