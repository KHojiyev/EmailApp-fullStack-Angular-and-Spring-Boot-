package email.app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUser {

  private String firstName;

  private String lastName;

  private String email;

  private String phone;

  private String password;


}
