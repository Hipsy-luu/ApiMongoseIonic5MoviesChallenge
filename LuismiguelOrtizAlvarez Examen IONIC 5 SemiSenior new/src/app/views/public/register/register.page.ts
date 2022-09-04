import { ApiDataService } from './../../../services/apiData/api-data.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { DataSessionService } from '../../../services/dataSession/data-session.service';
import { UtilitiesService } from '../../../services/utilities/utilities.service';
import { LoggedResponse } from '../../../classes/loggedResponse.class';
import { ServerMessage } from '../../../classes/serverMessage.class';
import { User } from '../../../classes/user.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerUserForm: FormGroup;

  randomUserData : User;

  constructor(public formBuilder: FormBuilder, private dataSessionService: DataSessionService,
    public utilitiesService: UtilitiesService,private apiDataService : ApiDataService) {
      this.randomUserData = new User();
      this.setupForm();
  }

  ngOnInit() {
    this.apiDataService.getRandomUsersData().then((response : { info : any , results : any[]  })=>{
      this.randomUserData = new User();

      this.randomUserData.idUser = response.results[0].login.uuid;
      this.randomUserData.email = response.results[0].email;
      this.randomUserData.firstName = response.results[0].name.first;
      this.randomUserData.lastName = response.results[0].name.last;
      this.randomUserData.phone = response.results[0].cell;
      this.randomUserData.password = response.results[0].login.password;
      this.randomUserData.salt = "";

      while (this.randomUserData.phone.length < 10) {
        this.randomUserData.phone = this.randomUserData.phone + "0";
      }

      this.setupForm();      
    }).catch((error)=>{
      console.log(error);
      this.utilitiesService.presentToast("No se pudieron cargar los usuarios");
    });
  }

  ionViewWillEnter() {
    this.setupForm();

    this.dataSessionService.checkLogin((loggedResponse: LoggedResponse) => {
      this.dataSessionService.navigateByUrl("/client/home");
    }, (noLoginResponse: LoggedResponse) => {
      //console.log(noLoginResponse);
    });
  }

  setupForm() {
    this.registerUserForm = this.formBuilder.group({
      idUser: [this.randomUserData.idUser, [ Validators.required]],
      firstName: [this.randomUserData.firstName, [Validators.minLength(1), Validators.required]],
      lastName: [this.randomUserData.lastName, [Validators.minLength(1), Validators.required]],
      phone: [this.randomUserData.phone, [Validators.minLength(10), Validators.required]],
      email: [this.randomUserData.email, [Validators.email, Validators.required]],
      confirmPassword: [this.randomUserData.password, [Validators.minLength(4), Validators.required]],
      password: [this.randomUserData.password, [Validators.minLength(4), Validators.required]],
      checkTerms: [false, [Validators.requiredTrue, Validators.required]],
    });
  }

  get idUser(): AbstractControl {
    return this.registerUserForm.get('idUser');
  }
  get email(): AbstractControl {
    return this.registerUserForm.get('email');
  }
  get firstName(): AbstractControl {
    return this.registerUserForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.registerUserForm.get('lastName');
  }
  get phone(): AbstractControl {
    return this.registerUserForm.get('phone');
  }
  get password(): AbstractControl {
    return this.registerUserForm.get('password');
  }
  get confirmPassword(): AbstractControl {
    return this.registerUserForm.get('confirmPassword');
  }
  get checkTerms(): AbstractControl {
    return this.registerUserForm.get('checkTerms');
  }

  registerClient() {
    this.utilitiesService.presentLoading("Registrando", async (loadingAnimation) => {
      this.dataSessionService.registerUser(this.registerUserForm.value).then(async (response: any) => {
        if (response.error == true) {
          this.utilitiesService.presentToast(response.message, 4000);
        } else {
          //load user data
          this.dataSessionService.setUserData(response.data);
          this.utilitiesService.presentToast(response.message, 2000);

          this.dataSessionService.navigateByUrl("/client/home");
        }
        await loadingAnimation.dismiss();
      }, async (error) => {
        console.log(error);
        this.utilitiesService.presentToast(error.message, 4000);

        await loadingAnimation.dismiss();
      });
    });
  }

}
