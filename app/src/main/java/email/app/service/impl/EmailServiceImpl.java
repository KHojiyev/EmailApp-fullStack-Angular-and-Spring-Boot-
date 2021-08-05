package email.app.service.impl;

import email.app.model.EmailMessage;
import email.app.model.EmailUser;
import email.app.repository.EmailRepository;
import email.app.repository.UserRepository;
import email.app.response.*;
import email.app.service.EmailMessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static email.app.service.ConvertServiceForResponse.convertEmailForResponse;

@Service
public class EmailServiceImpl implements EmailMessageService {

  final EmailRepository emailRepository;
  final UserRepository userRepository;

  public EmailServiceImpl(EmailRepository emailRepository, UserRepository userRepository) {
    this.emailRepository = emailRepository;
    this.userRepository = userRepository;
  }

  @Override
  public Response setEmailAsRead(GetUserMessages userMessages) {
    Optional<EmailMessage> emailMessage = emailRepository.findById(userMessages.getId());
    if (emailMessage.isEmpty())
      return new Response(false, "email was not found", null);
    EmailMessage mail = emailMessage.get();
    if (mail.getReceiver().getEmail().trim().equals(userMessages.getReceiverEmail().trim())) {
      mail.setRead(true);
    }
    EmailMessage message = emailRepository.save(mail);

    return new Response(true, "user was updated", message);
  }

  @Override
  public Response getUnreadMessages(EnteringEmail enteringEmail) {

    Optional<List<EmailMessage>> unreadMessages = emailRepository.getUnreadMessages(enteringEmail.getEmail());
    if (unreadMessages.isEmpty())
      return new Response(false, "email was not found", null);

    return new Response(true, "messages", convertEmailForResponse(unreadMessages));

  }

  @Override
  public Response getSentMessages(EnteringEmail enteringEmail) {
    Optional<List<EmailMessage>> sentMessages = emailRepository.getSentMessages(enteringEmail.getEmail());
    if (sentMessages.isEmpty())
      return new Response(false, "email was not found", null);

    return new Response(true, "messages", convertEmailForResponse(sentMessages));

  }

  // have to review
  @Override
  public Response setTimeForNewMessages(EnteringEmail enteringEmail) {
    Optional<List<EmailMessage>> newMessages = emailRepository.getAllNewEmails(enteringEmail.getEmail());
    if (newMessages.isEmpty())
      return new Response(false, "email was not found", null);

    for (EmailMessage emailMessage : newMessages.get()) {
      emailMessage.setReceivedAt(LocalDateTime.now());
      emailRepository.save(emailMessage);
    }
    return new Response(true, "success", true);
  }

  @Override
  public Response sendMessage(SendMessage sendMessage) {
    Optional<EmailUser> sender = userRepository.findByEmail(sendMessage.getSender());
    if (sender.isEmpty()) {
      return new Response(false, "sender email was not found", null);
    }
    Optional<EmailUser> receiver = userRepository.findByEmail(sendMessage.getReceiver());
    if (receiver.isEmpty()) {
      return new Response(false, "receiver email was not found", null);
    }

    EmailMessage emailMessage = new EmailMessage(
      sender.get(),
      receiver.get(),
      sendMessage.getSubject(),
      sendMessage.getText(),
      LocalDateTime.now(),
      null,
      false,
      false,
      false,
      false,
      false,
      true
    );

    emailRepository.save(emailMessage);

    return new Response(true, "success", true);
  }

  @Override
  public Response restoreMessage(DeleteMessage restoreMessage) {
    Optional<EmailMessage> deletingMessage = emailRepository.findById(restoreMessage.getMessageId());
    if (deletingMessage.isEmpty())
      return new Response(false, "email was not found", null);

    EmailMessage resMessage = deletingMessage.get();
    if (restoreMessage.getUserEmail().trim().equals(resMessage.getSender().getEmail().trim())) {
      resMessage.setSenderDeleted(false);
    } else {
      resMessage.setReceiverDeleted(false);
    }
    emailRepository.save(resMessage);

    return new Response(true, "email was deleted", true);
  }

  @Override
  public Response deleteMessagePer(DeleteMessage deleteMessage) {
    Optional<EmailMessage> deletingMessage = emailRepository.findById(deleteMessage.getMessageId());
    if (deletingMessage.isEmpty())
      return new Response(false, "email was not found", null);
    EmailMessage delMessage = deletingMessage.get();
    if (deleteMessage.getUserEmail().trim().equals(delMessage.getSender().getEmail().trim())) {
      delMessage.setSenderDeletedPermanently(true);
    } else {
      delMessage.setReceiverDeletedPermanently(true);
    }
    emailRepository.save(delMessage);

    return new Response(true, "email was deleted", true);
  }

  @Override
  public Response deleteMessage(DeleteMessage deleteMessage) {
    Optional<EmailMessage> deletingMessage = emailRepository.findById(deleteMessage.getMessageId());
    if (deletingMessage.isEmpty())
      return new Response(false, "email was not found", null);
    EmailMessage delMessage = deletingMessage.get();
    if (deleteMessage.getUserEmail().trim().equals(delMessage.getSender().getEmail().trim())) {
      delMessage.setSenderDeleted(true);
    } else {
      delMessage.setReceiverDeleted(true);
    }
    emailRepository.save(delMessage);

    return new Response(true, "email was deleted", true);
  }

  @Override
  public Response getBinMessages(EnteringEmail enteringEmail) {
    Optional<List<EmailMessage>> binMessages = emailRepository.getBinMessages(enteringEmail.getEmail());
    if (binMessages.isEmpty())
      return new Response(false, "email was not found", null);
    return new Response(true, "messages", convertEmailForResponse(binMessages));
  }

  @Override
  public Response getInboxMessages(EnteringEmail enteringEmail) {

    Optional<List<EmailMessage>> inboxMessages = emailRepository.getInboxMessages(enteringEmail.getEmail());
    if (inboxMessages.isEmpty())
      return new Response(false, "email was not found", null);
    return new Response(true, "messages", convertEmailForResponse(inboxMessages));
  }
}
