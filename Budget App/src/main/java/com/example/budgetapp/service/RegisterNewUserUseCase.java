package com.example.budgetapp.service;

import com.example.budgetapp.model.User;
import com.example.budgetapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RegisterNewUserUseCase {

    private final UserRepository userRepository;

    public User execute(User user) {
        return userRepository.save(user);
    }
}
