package com.example.budgetapp.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
  private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

  public String createToken(String email) {
    Date now = new Date();
    long validityInMilliseconds = 3600000;
    Date validity = new Date(now.getTime() + validityInMilliseconds);

    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(secretKey)
        .compact();
  }
}

