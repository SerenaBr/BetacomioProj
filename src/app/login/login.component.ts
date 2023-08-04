import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { SrvloginService } from '../Service/srvlogin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  private formSubmitAttempt: boolean;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(private srv:SrvloginService, private router: Router) {}

  LoginManager(usr: HTMLInputElement, pwd: HTMLInputElement){
    this.srv.LoginManager(usr.value, pwd.value).subscribe((resp) => {
      switch (resp.status) {
        case HttpStatusCode.Ok:
          this.router.navigate(['/home']);
          break;
        case HttpStatusCode.BadRequest:

          alert('RICHIESTA NON VALIDA !!!');
          break;
          case HttpStatusCode.RequestTimeout:
          alert("OOOPS !!! Sessione Web AcademyNet3, scaduta. Eseguire nuovamente il Login")
          break;
      }
    });
  }
}
