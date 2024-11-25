package com.example.budgetapp.security;

import com.example.budgetapp.model.User;
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
    var user = User.builder()
        .id(0)
        .firstName("John")
        .lastName("Doe")
        .email("john@doe.com")
        .build();

    String token = jwtTokenProvider.createToken(user);

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

    assertEquals(extractedEmail, user.getEmail());

    assertTrue(expiration.after(new Date()));
  }
}
