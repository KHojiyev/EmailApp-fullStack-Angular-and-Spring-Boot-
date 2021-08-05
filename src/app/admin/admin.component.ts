import {Component, OnInit} from '@angular/core';
import {EmailService} from "../common/service/email.service";
import {User} from "../common/class/User";
import {EmailMessage} from "../common/class/EmailMessage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // @ts-ignore
  searchedKeyword: string;
// @ts-ignore
  countBinMessages: number;
  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));

  // @ts-ignore
  currentMessage: EmailMessage = <EmailMessage>JSON.parse(localStorage.getItem('selectedMessage'));

  // @ts-ignore
  messages: EmailMessage[];

  read: string  = "true";
  unread: string  = "false";

  // @ts-ignore
  countUnreadMessages: number;

  // @ts-ignore
  countSentMessages: number;
  // @ts-ignore
  countInboxMessages: number;


  onClick(message: EmailMessage) {
    localStorage.setItem('selectedMessage', JSON.stringify(message).toString());
    this.router.navigate(['message'])
  }


  constructor(private emailService: EmailService, private router: Router) {
  }

  // @ts-ignore
  Status: string;
  // @ts-ignore
  countArchiveMessages: number;

  ngOnInit(): void {

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {

        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });
    // get all messages for home page
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
      if (value){
        this.countUnreadMessages  = JSON.parse(JSON.stringify(value)).length;
      }
    });

    this.emailService.getSentEmails(this.ActiveUser.email).subscribe(value => {
      if (value){
        this.countSentMessages  = JSON.parse(JSON.stringify(value)).length;
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
  deleteMessage(message: EmailMessage) {
    this.emailService.deleteMessage(this.ActiveUser.email, message.id)
      .subscribe(value => {
        if (value) {
          this.ngOnInit();
        }
      });
  }


}
