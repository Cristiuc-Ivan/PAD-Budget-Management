package com.example.budgetapp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserRegistrationDTO {

    @NotBlank(message = "First Name is required")
    @Size(min = 1)
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Size(min = 1)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email
    private String email;
}
