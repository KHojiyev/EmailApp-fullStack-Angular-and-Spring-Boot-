import {Component, OnInit} from '@angular/core';
import {AuthService} from "../common/service/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../common/class/User";
import {EmailService} from "../common/service/email.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(3)]
    ),
    password: new FormControl()
  })

  constructor(private Auth: AuthService, private router: Router,private emailService: EmailService) {
  }


  ngOnInit(): void {
  }

  get login() {
    return this.form.get('login');
  }

  status = true;

  loginUser(event: Event) {
    this.status = this.Auth.isLoggedIn;
    event.preventDefault()
    const target = event.target;
    // @ts-ignore
    const email = target.querySelector('#email').value;
    // @ts-ignore
    const password = target.querySelector('#password').value;

    this.Auth.getUserDetails(email, password).subscribe(value => {
      if (value) {
        console.log(value);
        // redirect to admin
        this.Auth.setLoggedIn(true);
        // @ts-ignore
        localStorage.setItem('activeUser', JSON.stringify(value).toString());
        // @ts-ignore
        const ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));
        // @ts-ignore
        this.emailService.settingTimeForNewMessages(ActiveUser.email).subscribe(value1 => {
          this.router.navigate(['admin'])
        })
      }
    });

  }


}
