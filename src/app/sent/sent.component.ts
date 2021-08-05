import {Component, OnInit} from '@angular/core';
import {EmailMessage} from "../common/class/EmailMessage";
import {EmailService} from "../common/service/email.service";
import {User} from "../common/class/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  // @ts-ignore
  searchedKeyword: string;
  // @ts-ignore
  messages: EmailMessage[];
  // @ts-ignore
  countInboxMessages: number;
  // @ts-ignore
  countUnreadMessages: number;
  // @ts-ignore
  countSentMessages: number;

  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));
  read: string = "true";
  unread: string = "false";
  // @ts-ignore
  countBinMessages: number;
  // @ts-ignore
  countArchiveMessages: number;

  constructor(private emailService: EmailService,private router: Router) { }

  ngOnInit(): void {

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {

        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

    // @ts-ignore
    this.emailService.getSentEmails(this.ActiveUser.email).subscribe(value => {
      if (value) {
        // @ts-ignore
        this.messages = JSON.parse(JSON.stringify(value));
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

    // @ts-ignore
    this.emailService.getUnreadMessages(this.ActiveUser.email).subscribe(value => {
      if (value){

        this.countUnreadMessages  = JSON.parse(JSON.stringify(value)).length;
        console.log(this.countUnreadMessages);
      }
    });

    this.emailService.getSentEmails(this.ActiveUser.email).subscribe(value => {
      if (value){
        this.countSentMessages  = JSON.parse(JSON.stringify(value)).length;
        console.log(this.countUnreadMessages);
      }
    })

  }



  onClick(message: EmailMessage){
    localStorage.setItem('selectedMessage', JSON.stringify(message).toString());

    this.router.navigate(['message'])
  }
  logOut(){
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
