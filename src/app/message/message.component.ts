import {Component, Input, OnInit} from '@angular/core';
import {EmailMessage} from "../common/class/EmailMessage";
import {User} from "../common/class/User";
import {EmailService} from "../common/service/email.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  constructor(private emailService: EmailService) {

  }

// @ts-ignore
  currentMessage: EmailMessage  = <EmailMessage>JSON.parse(localStorage.getItem('selectedMessage'));

  // @ts-ignore
  Status: string ;

  // @ts-ignore
  ActiveUser: User = <User>JSON.parse(localStorage.getItem("activeUser"));


  ngOnInit(): void {

    this.emailService.setEmailAsRead(this.currentMessage.id,this.ActiveUser.email).subscribe(value => {
      if (value){
        console.log("status message:")
        console.log(value);
      }
    });

    if (this.currentMessage.read){
      this.Status = "Read";
    }else {
      this.Status = "Unread";
    }
  }
}
