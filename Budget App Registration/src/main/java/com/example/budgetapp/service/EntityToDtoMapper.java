package com.example.budgetapp.service;

import com.example.budgetapp.dto.UserRegistrationDTO;
import com.example.budgetapp.model.User;

public class EntityToDtoMapper {
    public static UserRegistrationDTO getUserRegistrationDTO(User user) {
        return UserRegistrationDTO.builder().email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}
