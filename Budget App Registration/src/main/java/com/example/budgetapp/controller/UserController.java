package com.example.budgetapp.controller;

import com.example.budgetapp.dto.UserAuthenticateDTO;
import com.example.budgetapp.dto.UserRegistrationDTO;
import com.example.budgetapp.model.User;
import com.example.budgetapp.service.AuthenticateUserUseCase;
import com.example.budgetapp.service.CreateNewUserUseCase;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private final CreateNewUserUseCase createNewUserUseCase;
    private final AuthenticateUserUseCase authenticateUserUseCase;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationDTO> createUser(@RequestBody @Valid User user) {
        return ResponseEntity.ok(createNewUserUseCase
                .execute(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid UserAuthenticateDTO user) {
        String token = authenticateUserUseCase.execute(user.getEmail(), user.getPassword());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
