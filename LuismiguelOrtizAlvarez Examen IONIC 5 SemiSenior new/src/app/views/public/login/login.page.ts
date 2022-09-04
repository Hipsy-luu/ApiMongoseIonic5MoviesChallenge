import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DataSessionService } from '../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../classes/loggedResponse.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private dataSessionService: DataSessionService,
    private utilitiesService: UtilitiesService
  ) {
    this.setupForm();
  }

  async ionViewWillEnter() {
    this.setupForm();
    //await this.dataSessionService.logOut();

    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
        this.dataSessionService.navigateByUrl('/client/home');
      },(noLoginResponse: LoggedResponse) => {
        //console.log(noLoginResponse);
      }
    );
  }

  async ngOnInit() {
    
  }

  setupForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
      //email: ['mhmdmhdy.khmrw@example.com', [Validators.email, Validators.required]],
      //password: ['mirror', [Validators.minLength(4), Validators.required]]
    });
  }

  //Function for do the login
  onSubmit() {
    this.utilitiesService.presentLoading('Iniciando sesión',async (loadingAnimation) => {
        this.dataSessionService.loginUser(this.email.value, this.password.value)
          .then( async (response: any) => {
            if (response.error == true) {
              this.utilitiesService.presentToast(response.message, 4000);
            } else if (response.error == false) {
              //load user data
              this.setupForm();
              this.dataSessionService.setUserData(response.data);

              this.dataSessionService.navigateByUrl('/client/home');
            }
            await loadingAnimation.dismiss();
          }, async (error) => {
            //console.log(error);
            this.utilitiesService.presentToast(error.message, 4000);

            await loadingAnimation.dismiss();
          });
      }
    );
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
