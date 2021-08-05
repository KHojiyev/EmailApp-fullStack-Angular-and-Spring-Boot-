package email.app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnteringEmail {


  private String email;



}
