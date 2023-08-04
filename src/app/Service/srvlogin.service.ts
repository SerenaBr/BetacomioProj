import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SrvloginService {
  cred : Credentials
  constructor(private http:HttpClient) { }

  LoginManager(user: string, pwd: string){
    this.cred = {username : user, password : pwd}
    return this.http.post('https://localhost:7286/api/Login', this.cred, {observe: 'response'})
  }
}

interface Credentials{
  username: string,
  password: string
}