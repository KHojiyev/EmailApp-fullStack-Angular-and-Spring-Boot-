import {Component, OnInit} from '@angular/core';
import {User} from "../common/class/User";
import {EmailMessage} from "../common/class/EmailMessage";
import {EmailService} from "../common/service/email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {


// @ts-ignore
  countBinMessages: number;
  // @ts-ignore
  messages: EmailMessage[];
  // @ts-ignore
  countUnreadMessages: number;
  // @ts-ignore
  countSentMessages: number;
  // @ts-ignore
  countInboxMessages: number;
  // @ts-ignore
  countArchiveMessages: number;
  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));

  constructor(private emailService: EmailService) {
  }

  ngOnInit(): void {

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {

        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

    this.emailService.getEmailMessages(Number(this.ActiveUser.id)).subscribe(value => {
      if (value) {
        // @ts-ignore
        this.messages = JSON.parse(JSON.stringify(value));
        console.log(this.messages);
      } else {
        window.alert("no result");
      }
    });

    this.emailService.getUnreadMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countUnreadMessages = JSON.parse(JSON.stringify(value)).length;
      }
    });

    this.emailService.getSentEmails(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countSentMessages = JSON.parse(JSON.stringify(value)).length;
        console.log(this.countUnreadMessages);
      }
    });

    this.emailService.getInboxMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countInboxMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

  }

  logOut() {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("selectedMessage");
  }
}
