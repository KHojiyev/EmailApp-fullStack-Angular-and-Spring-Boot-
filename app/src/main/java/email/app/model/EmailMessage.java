package email.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  private EmailUser sender;

  @ManyToOne
  private EmailUser receiver;

  private String subject;

  private String messageText;

  private LocalDateTime createdAt;

  private LocalDateTime receivedAt;

  private boolean isRead;

  private boolean senderDeleted;

  private boolean receiverDeleted;

  private boolean senderDeletedPermanently;

  private boolean receiverDeletedPermanently;

  private boolean isRecyclable;

  public EmailMessage(EmailUser sender, EmailUser receiver, String subject, String messageText, LocalDateTime createdAt, LocalDateTime receivedAt, boolean isRead, boolean senderDeleted, boolean receiverDeleted, boolean senderDeletedPermanently, boolean receiverDeletedPermanently, boolean isRecyclable) {
    this.sender = sender;
    this.receiver = receiver;
    this.subject = subject;
    this.messageText = messageText;
    this.createdAt = createdAt;
    this.receivedAt = receivedAt;
    this.isRead = isRead;
    this.senderDeleted = senderDeleted;
    this.receiverDeleted = receiverDeleted;
    this.senderDeletedPermanently = senderDeletedPermanently;
    this.receiverDeletedPermanently = receiverDeletedPermanently;
    this.isRecyclable = isRecyclable;
  }
}
