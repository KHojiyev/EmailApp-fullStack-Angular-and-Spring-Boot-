package email.app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMessage {

  private String sender;
  private String receiver;
  private String subject;
  private String text;



}
