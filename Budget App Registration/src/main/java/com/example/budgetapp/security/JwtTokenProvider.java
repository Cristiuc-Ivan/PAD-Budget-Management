package com.example.budgetapp.security;

import com.example.budgetapp.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.Collections;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class JwtTokenProvider {

  @Value("${jwt.secret.key}")
  private String secretKeyString;
  private Key secretKey;

  @PostConstruct
  private void initializeKey() {
    secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
  }

  public String createToken(User user) {
    Date now = new Date();
    long validityInMilliseconds = 3600000;
    Date validity = new Date(now.getTime() + validityInMilliseconds);

    return Jwts.builder()
        .setId(String.valueOf(UUID.randomUUID()))
        .claim("ID", user.getId())
        .setSubject(user.getEmail())
        .setHeaderParam("typ", "JWT")
        .setHeaderParam("Name", user.getFirstName())
        .setHeaderParam("Surname", user.getLastName())
        .claim("roles", Collections.singletonList("ROLE_USER"))
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(secretKey)
        .compact();
  }

}

