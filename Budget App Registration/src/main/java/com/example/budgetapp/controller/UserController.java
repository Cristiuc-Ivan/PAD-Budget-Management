package com.example.budgetapp.controller;

import com.example.budgetapp.data.model.User;
import com.example.budgetapp.service.CreateNewUserUseCase;
import com.example.budgetapp.service.GetAllUsersUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final GetAllUsersUseCase getAllUsersUseCase;
    private final CreateNewUserUseCase createNewUserUseCase;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(createNewUserUseCase
                .execute(user));
    }
}
