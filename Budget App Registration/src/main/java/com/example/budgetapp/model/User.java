package com.example.budgetapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private int id;

  @NotBlank(message = "First Name is required")
  @Size(min = 1)
  @Column(name = "first_name")
  private String firstName;

  @NotBlank(message = "Last Name is required")
  @Size(min = 1)
  @Column(name = "second_name")
  private String lastName;

  @NotBlank(message = "Email is required")
  @Email
  @Column(name = "email")
  private String email;

  @Size(min = 6)
  @Column(name = "password")
  private String password;


}