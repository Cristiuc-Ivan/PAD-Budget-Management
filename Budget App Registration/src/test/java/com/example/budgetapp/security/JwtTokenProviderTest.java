package com.example.budgetapp.security;

import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.security.Key;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
public class JwtTokenProviderTest {

  @InjectMocks
  private JwtTokenProvider jwtTokenProvider;

  private Key secretKey;

  @BeforeEach
  void setUp() {
    secretKey = jwtTokenProvider.getSecretKey();
  }

  @Test
  void createToken_ShouldGenerateToken_WithCorrectValues() {
    String email = "test@email.com";

    String token = jwtTokenProvider.createToken(email);

    assertTrue(token != null && !token.isEmpty());

    String extractedEmail = Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();

    Date expiration = Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getExpiration();

    assertEquals(extractedEmail, email);

    assertTrue(expiration.after(new Date()));
  }
}
