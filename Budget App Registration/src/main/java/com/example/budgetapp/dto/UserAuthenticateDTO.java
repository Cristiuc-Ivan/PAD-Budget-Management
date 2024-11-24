package com.example.budgetapp.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserAuthenticateDTO {

    private int id;

    @NotBlank(message = "Email is required")
    @Email
    private String email;
    @Size(min = 6)
    @NotBlank
    private String password;

}
