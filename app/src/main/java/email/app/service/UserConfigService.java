/*
package email.app.service;

import email.app.model.EmailUser;
import email.app.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserConfigService implements UserDetailsService {

  final UserRepository userRepository;

  public UserConfigService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<EmailUser> byEmail = userRepository.findByEmail(email);
    EmailUser emailUser = byEmail.get();
    return new User(emailUser.getEmail(),emailUser.getPassword(),new ArrayList<>());
  }
}
*/
