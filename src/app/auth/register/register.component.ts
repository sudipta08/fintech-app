import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  registrationForm: FormGroup;

  ngOnInit() {
    //initialise the form
    this.registrationForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(50)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  onRegister(){
    if(this.registrationForm.invalid){
      return;
    }
    const user = new User(this.registrationForm.value.username, this.registrationForm.value.password, this.registrationForm.value.email);
    this.authService.registerUser(user);
  }
}
