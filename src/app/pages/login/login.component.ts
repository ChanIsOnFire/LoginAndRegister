import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  errorMessage = ''; 
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  login()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
         this.router.navigate(['/userinfo'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/login'])
        })
    }
  }

  validateForm(email, password) {
    if (email.lenght === 0) {
      this.errorMessage = "MAG LAGAY NG EMAIL PLEASE";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = "MAGLAGAY NG PASSWORD PLEASE";
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = "ANG IKSI NAMAN NG PASSWORD MO ATLEAST 6 CHAR";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}