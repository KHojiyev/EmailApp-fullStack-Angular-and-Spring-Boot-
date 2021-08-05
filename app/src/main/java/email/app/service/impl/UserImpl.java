package email.app.service.impl;

import email.app.jwt.JwtProvider;
import email.app.model.EmailMessage;
import email.app.model.EmailUser;
import email.app.repository.EmailRepository;
import email.app.repository.UserRepository;
import email.app.response.*;
import email.app.service.UserService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static email.app.service.ConvertServiceForResponse.convertEmailForResponse;

@Service
@Transactional(rollbackOn = Exception.class)
public class UserImpl implements UserService {

  final UserRepository userRepository;
  final EmailRepository emailRepository;

  public UserImpl(UserRepository userRepository, EmailRepository emailRepository) {
    this.userRepository = userRepository;
    this.emailRepository = emailRepository;
  }


  @Override
  public Response loginUser(LoginUser loginUser) {
    Optional<EmailUser> optionalEmailUser = userRepository.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
    if (optionalEmailUser.isEmpty())
      return new Response(false,"user was not found",null);

    JwtProvider jwtProvider = new JwtProvider();
    String generateToken = jwtProvider.generateToken(optionalEmailUser.get());
    String generateToken2 = jwtProvider.generateInfoWithToken(optionalEmailUser.get());


    return new Response(true,"user success",optionalEmailUser.get());
  }

  @Override
  public Response getUserMessages(GetUserMessages getUserMessages) {

    Optional<List<EmailMessage>> emailMessages = emailRepository.findBySenderIdReceiverId(getUserMessages.getId());
    if (emailMessages.isEmpty())
      return new Response(false,"messages were not found",null);

    return new Response(true, "messages", convertEmailForResponse(emailMessages));
  }

  @Override
  @Transactional
  public Response registerUser(RegisterUser registerUser) {
    EmailUser emailUser = new EmailUser(
      registerUser.getFirstName(),
      registerUser.getLastName(),
      registerUser.getEmail(),
      registerUser.getPhone(),
      registerUser.getPassword()
    );
    EmailUser save = userRepository.save(emailUser);

    return  new Response(true,"user was saved",save);

  }


}
