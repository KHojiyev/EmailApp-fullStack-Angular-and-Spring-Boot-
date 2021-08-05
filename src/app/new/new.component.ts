import {Component, OnInit} from '@angular/core';
import {EmailMessage} from "../common/class/EmailMessage";
import {EmailService} from "../common/service/email.service";
import {User} from "../common/class/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // @ts-ignore
  messages: EmailMessage[];
  // @ts-ignore
  searchedKeyword: string;
  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));
  // @ts-ignore
  countInboxMessages: number;
  // @ts-ignore
  countUnreadMessages: number;
  // @ts-ignore
  countSentMessages: number;
  // @ts-ignore
  countArchiveMessages: number;
  // @ts-ignore
  countBinMessages: number;

  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.messages);
    // @ts-ignore
    this.messages = null;
    // @ts-ignore
    this.emailService.getUnreadMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        // @ts-ignore
        this.messages = JSON.parse(JSON.stringify(value));
        this.countUnreadMessages = JSON.parse(JSON.stringify(value)).length;

      } else {
        window.alert("no result");
      }
    });
    this.emailService.getInboxMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {


        this.countInboxMessages = JSON.parse(JSON.stringify(value)).length;

        console.log(this.messages);
      }
    });

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {

        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });


    this.emailService.getSentEmails(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countSentMessages = JSON.parse(JSON.stringify(value)).length;
        console.log(this.countUnreadMessages);
      }
    })
  }

  logOut() {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("selectedMessage");
  }

  onClick(message: EmailMessage) {
    localStorage.setItem('selectedMessage', JSON.stringify(message).toString());

    this.router.navigate(['message'])
  }

  deleteMessage(message: EmailMessage) {
    this.emailService.deleteMessage(this.ActiveUser.email, message.id)
      .subscribe(value => {
        if (value) {
          this.ngOnInit();
        }
      });
  }

}
