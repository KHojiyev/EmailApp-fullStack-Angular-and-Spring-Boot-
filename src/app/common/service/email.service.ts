import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SendMessage} from "../class/SendMessage";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  // getting all emails for home page
  getEmailMessages(id: number): Observable<any> {
    // @ts-ignore
    return this.http.post('http://localhost:8080/api/user/getMessages', {id});
  }

  // getting all unread messages of user
  getUnreadMessages(email: string): Observable<any> {
    // @ts-ignore
    return this.http.post('http://localhost:8080/api/email/unreadMessages', {email});
  }

  // change to "READ" status of email  when user read it
  setEmailAsRead(id: number, receiverEmail: string): Observable<any> {
    return this.http.put('http://localhost:8080/api/email/setEmailAsRead', {id,receiverEmail});
  }

  // getting sent emails of user
  getSentEmails(email: string): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/sentMessages', {email});
  }

  getInboxMessages(email: string): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/inboxMessages',{email});
  }

  getBinMessages(email: string): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/binMessages',{email});
  }

  deleteMessagePermanently(userEmail: string,messageId: number): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/deleteMessagePer',{userEmail,messageId});
  }

  deleteMessage(userEmail: string,messageId: number): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/deleteMessage',{userEmail,messageId});
  }

  restoreMessage(userEmail: string,messageId: number): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/restoreMessage',{userEmail,messageId});
  }

  sendMessage(mail: SendMessage): Observable<any>{
    return this.http.post('http://localhost:8080/api/email/sendMessage',mail);
  }

  settingTimeForNewMessages(email: string):Observable<any>{
    // @ts-ignore
    return  this.http.post('http://localhost:8080/api/email/setTimeForNewMessages', {email});
  }

}
