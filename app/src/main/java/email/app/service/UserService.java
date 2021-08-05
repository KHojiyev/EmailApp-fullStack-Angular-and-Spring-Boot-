package email.app.service;

import email.app.response.GetUserMessages;
import email.app.response.LoginUser;
import email.app.response.RegisterUser;
import email.app.response.Response;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

  Response loginUser(LoginUser loginUser);

  Response registerUser(RegisterUser registerUser);

  Response getUserMessages(GetUserMessages getUserMessages);


}
