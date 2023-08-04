import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrazioneForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.registrazioneForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submitRegistration() {
    if (this.registrazioneForm.valid) {
      const formData = {
        email: this.registrazioneForm.get('email')?.value,
        password: this.registrazioneForm.get('password')?.value
      };

      const url = 'https://localhost:7286/api/Authentication';

      this.http.post(url, formData).subscribe(
        (response) => {
          console.log('Risposta dal server:', response);
          const navigationExtras: NavigationExtras = {
            state: { message: 'Utente Registrato' }
          };
          this.router.navigate(['/home-component'], navigationExtras);
        },
        (error) => {
          console.error('Errore nella chiamata al server:', error);
        }
      );
    }
  }
}
