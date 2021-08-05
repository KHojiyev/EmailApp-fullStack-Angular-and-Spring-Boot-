import {Component, OnInit} from '@angular/core';
import {AuthService} from "../common/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  pressed: boolean = false;
  // @ts-ignore
  firstName: string;
  // @ts-ignore
  lastName: string;
  // @ts-ignore
  email: string;
  // @ts-ignore
  phone: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  confirmPassword: boolean = false;

  registerUser(event: Event) {
    this.pressed = true;
    event.preventDefault()
    const target = event.target;
    // @ts-ignore
    this.firstName = target.querySelector('#firstName').value;
    // @ts-ignore
    this.lastName = target.querySelector('#lastName').value;
    // @ts-ignore
    this.email = target.querySelector('#email').value;
    // @ts-ignore
    this.phone = target.querySelector('#phone').value;
    // @ts-ignore
    this.password = target.querySelector('#password').value;
    // @ts-ignore
    const confirmPassword = target.querySelector('#confirm').value;

    if (this.password == confirmPassword && this.firstName && this.lastName && this.email && this.password) {
      this.confirmPassword = true;
      this.Auth.setUserDetails(this.firstName, this.lastName, this.email, this.phone, this.password).subscribe(value => {
        if (value) {

          this.Auth.setLoggedIn(true);
          // @ts-ignore
          localStorage.setItem('activeUser', JSON.stringify(value).toString());

          // @ts-ignore
          this.router.navigate(['admin']);
        }
      });
    }
  }
}
