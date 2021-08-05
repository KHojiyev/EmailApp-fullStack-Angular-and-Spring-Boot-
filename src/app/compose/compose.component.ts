import {Component, OnInit} from '@angular/core';
import {User} from "../common/class/User";
import {EmailService} from "../common/service/email.service";
import {Router} from "@angular/router";
import {SendMessage} from "../common/class/SendMessage";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  // @ts-ignore
  countUnreadMessages: number;
  // @ts-ignore
  countSentMessages: number;
// @ts-ignore
  countBinMessages: number;
  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));
  // @ts-ignore
  countInboxMessages: number;
  // @ts-ignore
  countArchiveMessages: number;

  // @ts-ignore
  senderEmailText: string = "";
  // @ts-ignore
  receiverEmailText: string = "";
  // @ts-ignore
  subjectText: string = "";
  // @ts-ignore
  messageText: string = "";


  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit(): void {

    this.messageText += new Date();
    this.senderEmailText = this.ActiveUser.email;

    this.emailService.getBinMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {

        this.countBinMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

    this.emailService.getInboxMessages(this.ActiveUser.email).subscribe(value => {
      if (value) {
        this.countInboxMessages = JSON.parse(JSON.stringify(value)).length;

      }
    });

    // @ts-ignore
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

  resetClick(event: Event) {


  }

  notifBarShow: boolean = false;

  sendClick() {

    const mess = new SendMessage(
      this.ActiveUser.email,
      this.receiverEmailText,
      this.subjectText,
      this.messageText);

    this.emailService.sendMessage(mess).subscribe(value => {
      if (value) {
        this.notifBarShow = true;

      }
    })


  }
  reset(){

    this.notifBarShow = false;
  }

  logOut() {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("selectedMessage");
  }

  clickNotMes() {

    this.notifBarShow  =false;
    setTimeout(() =>
      {

      },
      5000);

  }

}
