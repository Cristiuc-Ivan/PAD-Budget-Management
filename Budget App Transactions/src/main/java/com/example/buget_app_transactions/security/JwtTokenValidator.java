package com.example.buget_app_transactions.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtTokenValidator {

  @Value("${jwt.secret.key}")
  private String secretKeyString;
  private Key secretKey;

  @PostConstruct
  private void initializeKey() {
    secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(secretKey)
          .build()
          .parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      System.out.println("JWT validation failed: " + e.getMessage());
      return false;
    }
  }

  public String getEmailFromToken(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public Integer getUserIdFromToken(String authToken) {
    String token = authToken.substring(7);
    Claims claims = Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody();
    return claims.get("ID", Integer.class);
  }


}
