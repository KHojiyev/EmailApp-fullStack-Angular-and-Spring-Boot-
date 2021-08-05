import {Component, OnInit} from '@angular/core';
import {EmailMessage} from "../common/class/EmailMessage";
import {User} from "../common/class/User";
import {EmailService} from "../common/service/email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {
  // @ts-ignore
  countInboxMessages: number;
  // @ts-ignore
  countBinMessages: number;
  // @ts-ignore
  countUnreadMessages: number;
  // @ts-ignore
  countSentMessages: number;
  // @ts-ignore
  searchedKeyword: string;
  // @ts-ignore
  messages: EmailMessage[];

// @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));
  // @ts-ignore
  countArchiveMessages: number;

  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit(): void {

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;
      }
    });

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        // @ts-ignore
        this.messages = JSON.parse(JSON.stringify(value));
        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

    this.emailService.getInboxMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countInboxMessages = JSON.parse(JSON.stringify(value)).length;
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
      }
    })
  }

  logOut() {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("selectedMessage");
  }

  deleteMessagePermanently(message: EmailMessage) {
    this.emailService.deleteMessagePermanently(this.ActiveUser.email, message.id)
      .subscribe(value => {
        if (value) {
         this.ngOnInit();
        }
      });
  }


  restoreMessage(message: EmailMessage) {

    this.emailService.restoreMessage(this.ActiveUser.email,message.id)
      .subscribe(value => {
        if (value){
          this.ngOnInit();
        }
      })

  }
}
