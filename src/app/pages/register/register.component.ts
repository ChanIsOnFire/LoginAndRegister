import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email="";
  password="";
  message = '';
  errorMessage = ''; 
  error: { name: string, message: string } = { name: '', message: '' }; 

  constructor(private authservice: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
        .then(() => {
          this.message = "IKAW AY NAKA REHISTRO ANG DATA MO NASA FIREBASE"
         
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/register'])
        })
    }
  }

  validateForm(email, password)
  {
    if(email.lenght === 0)
    {
      this.errorMessage = "MAGLAGY KA NG EMAIL PLEASE";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = "MAGLAGAY KA NG PASSWORD PLEASE";
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = "ANG IKSI NAMAN NG PASSWORD MO ATLEAST 6 CHAR";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
