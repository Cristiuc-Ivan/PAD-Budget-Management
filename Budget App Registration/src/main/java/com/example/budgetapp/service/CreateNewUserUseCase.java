package com.example.budgetapp.service;

import com.example.budgetapp.data.model.User;
import com.example.budgetapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CreateNewUserUseCase {

    private final UserRepository userRepository;

    public User execute(User user) {
        return userRepository.save(user);
    }
}
