package email.app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {

  private Integer id;

  private String senderEmail;

  private String receiverEmail;

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


}
