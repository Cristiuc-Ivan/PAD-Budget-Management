package com.example.budgetapp.service;

import com.example.budgetapp.data.model.User;
import com.example.budgetapp.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GetAllUsersUseCase {

  private final UserRepository userRepository;

  public List<User> findAllUsers() {
    return userRepository.findAll();
  }
}
