package email.app.repository;

import email.app.model.EmailUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<EmailUser, String> {

  Optional<EmailUser> findByEmailAndPassword(String email, String password);

  //Optional<EmailUser> findByEmail(String email);

  Optional<EmailUser> findByEmail(String email);

}
