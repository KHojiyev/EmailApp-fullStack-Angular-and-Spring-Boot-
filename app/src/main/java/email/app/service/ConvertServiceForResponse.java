package email.app.service;


import email.app.model.EmailMessage;
import email.app.response.ResponseMessage;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ConvertServiceForResponse {

  // all converting codes type here

  public static List<ResponseMessage> convertEmailForResponse(Optional<List<EmailMessage>> messagesList) {

    // convert email
    List<ResponseMessage> messages = new ArrayList<>();
    for (EmailMessage emailMessage : messagesList.get()) {
      messages.add(new ResponseMessage(
        emailMessage.getId(),
        emailMessage.getSender().getEmail(),
        emailMessage.getReceiver().getEmail(),
        emailMessage.getSubject(),
        emailMessage.getMessageText(),
        emailMessage.getCreatedAt(),
        emailMessage.getReceivedAt(),
        emailMessage.isRead(),
        emailMessage.isSenderDeleted(),
        emailMessage.isReceiverDeleted(),
        emailMessage.isSenderDeletedPermanently(),
        emailMessage.isReceiverDeletedPermanently(),
        emailMessage.isRecyclable()
      ));
    }
    return messages;
  }




}
