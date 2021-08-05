package email.app.controller;

import email.app.response.GetUserMessages;
import email.app.response.LoginUser;
import email.app.response.RegisterUser;
import email.app.response.Response;
import email.app.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

  final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/login")
  public HttpEntity<?> loginUser(@RequestBody LoginUser loginUser) {
    System.out.println(loginUser);
    Response response = userService.loginUser(loginUser);
    return ResponseEntity.status(response.isStatus() ? HttpStatus.OK : HttpStatus.NOT_FOUND)
      .body(response.getObject());
  }

  @PostMapping("/register")
  public HttpEntity<?> registerUser(@RequestBody RegisterUser registerUser) {
    Response response = userService.registerUser(registerUser);
    return ResponseEntity.status(response.isStatus() ? HttpStatus.CREATED : HttpStatus.BAD_GATEWAY)
      .body(response.getObject());
  }

  @PostMapping("/getMessages")
  public HttpEntity<?> getMessages(@RequestBody GetUserMessages getUserMessages) {
    Response userMessages = userService.getUserMessages(getUserMessages);
    return ResponseEntity.status(userMessages.isStatus() ? HttpStatus.OK : HttpStatus.NOT_FOUND)
      .body(userMessages.getObject());
  }


}
