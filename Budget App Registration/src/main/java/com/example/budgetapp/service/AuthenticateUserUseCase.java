package com.example.budgetapp.service;

import com.example.budgetapp.model.User;
import com.example.budgetapp.repository.UserRepository;
import com.example.budgetapp.security.JwtTokenProvider;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticateUserUseCase {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public String execute(String email, String password) {
    User user = userRepository.findUserByEmail(email)
        .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new BadCredentialsException("Invalid username or password");
    }

    return jwtTokenProvider.createToken(email);
  }
}
