package email.app.repository;

import email.app.model.EmailMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<EmailMessage, Integer> {


  @Query(value = "select e from EmailMessage e " +
    "where e.sender.id = ?1 " +
    "or e.receiver.id = ?1 " +
    "and e.receiverDeleted = false " +
    "and e.senderDeleted = false " +
    "and e.senderDeletedPermanently = false " +
    "and e.receiverDeletedPermanently = false " +
    "order by e.createdAt,e.receivedAt desc")
  Optional<List<EmailMessage>> findBySenderIdReceiverId(Integer id);

  @Query(value = "select e from EmailMessage e " +
    "where e.receiver.email = ?1 " +
    "and e.isRead = false " +
    "and e.receiverDeleted = false " +
    "and e.receiverDeletedPermanently = false " +
    "order by e.createdAt desc ")
  Optional<List<EmailMessage>> getUnreadMessages(String email);

  @Query(value = "select e from EmailMessage e " +
    "where e.sender.email = ?1 " +
    "and e.senderDeleted = false " +
    "and e.senderDeletedPermanently = false " +
    "order by e.createdAt desc")
  Optional<List<EmailMessage>> getSentMessages(String email);

  @Query(value = "select e from EmailMessage e " +
    "where e.receiver.email = ?1 " +
    "and e.receiverDeleted = false " +
    "and e.receiverDeletedPermanently = false " +
    "order by e.receivedAt desc ")
  Optional<List<EmailMessage>> getInboxMessages(String email);


  @Query(value = "select e from EmailMessage e " +
    "where " +
    "( e.sender.email = ?1 and e.senderDeleted = true " +
    "and e.senderDeletedPermanently = false " +
    "and e.receiverDeletedPermanently = false) " +
    "or " +
    "( e.receiver.email = ?1 and e.receiverDeleted = true " +
    "and e.receiverDeletedPermanently = false " +
    "and e.senderDeletedPermanently = false) " +
    "order by e.createdAt,e.receivedAt desc ")
  Optional<List<EmailMessage>> getBinMessages(String email);


  @Query(value = "select e from EmailMessage e " +
    "where e.receivedAt is null " +
    "and e.receiver.email = ?1 ")
  Optional<List<EmailMessage>> getAllNewEmails(String email);


}
