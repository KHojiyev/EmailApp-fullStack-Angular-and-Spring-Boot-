export class SendMessage {

constructor(sender: string,receiver: string,subject: string, text: string) {

  this.sender = sender;
  this.receiver = receiver;
  this.subject = subject;
  this.text = text;

}

  sender: string = "";
  receiver: string = "";
  subject: string = "";
  text: string = "";


}
