package com.example.budgetapp.service;

import com.example.budgetapp.data.model.User;
import com.example.budgetapp.exception.exceptions.UserAlreadyExistsException;
import com.example.budgetapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CreateNewUserUseCase {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @SneakyThrows
  public User execute(User user) {
    if (Boolean.TRUE.equals(isUserRegistered(user))) {
      throw new UserAlreadyExistsException("User already exists");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

  private boolean isUserRegistered(User user) {
    return userRepository.findUserByEmail(user.getEmail()).isPresent();
  }
}
