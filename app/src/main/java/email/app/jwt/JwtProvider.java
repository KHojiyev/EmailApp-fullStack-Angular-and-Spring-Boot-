package email.app.jwt;

import email.app.model.EmailUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

  private static final Long expire_time = 3600L;    // 10 hours

  private static final String key = "bu jwt kalit xavfsizlikni ta'minlash uchun 01.08.2021 kuni ishlab chiqildi";

  public String generateToken(EmailUser emailUser) {

    return Jwts
      .builder()
      .claim("body", emailUser)
      .setExpiration(new Date(System.currentTimeMillis() + expire_time))
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .signWith(SignatureAlgorithm.HS512, key)
      .compact();
  }

  public String generateInfoWithToken(Object object) {

    return Jwts
      .builder()
      .claim("body", object)
      .signWith(SignatureAlgorithm.HS512, key)
      .compact();
  }
}
