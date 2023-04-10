import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginActionform: FormGroup;
  username: string;
  password: string;
  inputSelected: boolean;
  passSelected: boolean;
  passIconType: string = "";
  passwordtoggle: 'eye';
  showpassword = false;

  errorMessages = {
    userName: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter your username" }],

    password: [{ type: "required", message: "This field is mandatory" },
    { type: "pattern", message: "Please enter your password" }],
  };

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
  ) {
    debugger;
    this.loginActionform = this.formBuilder.group(
      {
        userName: ["",
          [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        ],

        password: ["", Validators.required],
      },

    )
    this.inputSelected = false
    this.passSelected = false
  }

  ngOnInit() {
  }


  changeInputBorder(type: boolean) {
    this.inputSelected = type;
  }
  changePassBorder(type: boolean) {
    this.passSelected = type;
  }
  togglePassword(): void {
    this.showpassword = !this.showpassword;
    if (this.passIconType === 'eye') {
      this.passIconType = "eye-off";
    }
    else {
      this.passIconType = "eye";
    }
  }

  loginAction() {

    console.log("Hello i am alive")

    let username = this.loginActionform.get("userName").value;
    let password = this.loginActionform.get("password").value;

    if (username == "test@test.com" && password == "8256455") {
      window.localStorage.setItem("LoginState", "Active")
      this.navCtrl.navigateForward("home");
    }
    else {
      this.showalert("Username and password do not match Please check username and password and try again!")
    }

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
}
