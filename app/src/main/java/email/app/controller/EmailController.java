package email.app.controller;

import email.app.response.*;
import email.app.service.EmailMessageService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")
public class EmailController {

  final EmailMessageService emailMessageService;


  public EmailController(EmailMessageService emailMessageService) {
    this.emailMessageService = emailMessageService;
  }

  @PutMapping("/setEmailAsRead")
  public HttpEntity<?> setEmailAsRead(@RequestBody GetUserMessages userMessages) {
    Response response = emailMessageService.setEmailAsRead(userMessages);
    return ResponseEntity.status(response.isStatus() ? HttpStatus.ACCEPTED : HttpStatus.NOT_FOUND).body(response.getObject());
  }

  @PostMapping("/unreadMessages")
  public HttpEntity<?> getUnreadMessages(@RequestBody EnteringEmail enteringEmail) {
    Response unreadMessages = emailMessageService.getUnreadMessages(enteringEmail);
    return ResponseEntity.status(unreadMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST).body(unreadMessages.getObject());
  }

  @PostMapping("/sentMessages")
  public HttpEntity<?> getSentMessages(@RequestBody EnteringEmail enteringEmail) {
    Response sentMessages = emailMessageService.getSentMessages(enteringEmail);
    return ResponseEntity.status(sentMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(sentMessages.getObject());
  }

  @PostMapping("/inboxMessages")
  public HttpEntity<?> getInboxMessages(@RequestBody EnteringEmail enteringEmail) {

    Response inboxMessages = emailMessageService.getInboxMessages(enteringEmail);
    return ResponseEntity.status(inboxMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(inboxMessages.getObject());
  }

  @PostMapping("/binMessages")
  public HttpEntity<?> getBinMessages(@RequestBody EnteringEmail enteringEmail) {
    Response binMessages = emailMessageService.getBinMessages(enteringEmail);
    return ResponseEntity.status(binMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(binMessages.getObject());
  }

  @PostMapping("/deleteMessagePer")
  public HttpEntity<?> deleteMessagePer(@RequestBody DeleteMessage deleteMessage) {
    Response deletingMessages = emailMessageService.deleteMessagePer(deleteMessage);
    return ResponseEntity.status(deletingMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(deletingMessages.getObject());
  }

  @PostMapping("/deleteMessage")
  public HttpEntity<?> deleteMessage(@RequestBody DeleteMessage deleteMessage) {
    Response deletingMessages = emailMessageService.deleteMessage(deleteMessage);
    return ResponseEntity.status(deletingMessages.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(deletingMessages.getObject());
  }

  @PostMapping("/restoreMessage")
  public HttpEntity<?> restoreMessage(@RequestBody DeleteMessage restoreMess) {
    Response restMessage = emailMessageService.restoreMessage(restoreMess);
    return ResponseEntity.status(restMessage.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(restMessage.getObject());
  }

  @PostMapping("/sendMessage")
  public HttpEntity<?> sendMessage(@RequestBody SendMessage sendMessage) {
    Response response = emailMessageService.sendMessage(sendMessage);
    return ResponseEntity.status(response.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(response.getObject());


  }

  @PostMapping("/setTimeForNewMessages")
  public HttpEntity<?> setTimeForNewMessages(@RequestBody EnteringEmail enteringEmail) {
    Response response = emailMessageService.setTimeForNewMessages(enteringEmail);
    return ResponseEntity.status(response.isStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
      .body(response.getObject());
  }
}
