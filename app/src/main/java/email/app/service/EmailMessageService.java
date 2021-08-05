package email.app.service;

import email.app.response.*;
import org.springframework.stereotype.Service;

@Service
public interface EmailMessageService {


  Response setEmailAsRead(GetUserMessages userMessages);

  Response getUnreadMessages(EnteringEmail enteringEmail);

  Response getSentMessages(EnteringEmail enteringEmail);

  Response getInboxMessages(EnteringEmail enteringEmail);

  Response getBinMessages(EnteringEmail enteringEmail);

  Response deleteMessagePer(DeleteMessage deleteMessage);

  Response deleteMessage(DeleteMessage deleteMessage);

  Response restoreMessage(DeleteMessage deleteMessage);

  Response sendMessage(SendMessage sendMessage);

  Response setTimeForNewMessages(EnteringEmail enteringEmail);
}
