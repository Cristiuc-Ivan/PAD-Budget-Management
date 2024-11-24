package com.example.budgetapp.service;

import com.example.budgetapp.dto.UserRegistrationDTO;
import com.example.budgetapp.exception.exceptions.UserAlreadyExistsException;
import com.example.budgetapp.model.User;
import com.example.budgetapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class CreateNewUserUseCaseTest {

  @InjectMocks
  private CreateNewUserUseCase createNewUserUseCase;

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  private User mockUser;

  @BeforeEach
  void setUp() {
    mockUser = User.builder()
        .id(1)
        .email("test@email.com")
        .password("password")
        .firstName("Test")
        .lastName("User")
        .build();
  }

  @Test
  void execute_ShouldThrowUserAlreadyExistsException_WhenUserExists() {
    when(userRepository.findUserByEmail(mockUser.getEmail())).thenReturn(java.util.Optional.of(mockUser));

    UserAlreadyExistsException thrown = assertThrows(
        UserAlreadyExistsException.class,
        () -> createNewUserUseCase.execute(mockUser)
    );

    assertEquals("User already exists", thrown.getMessage());

    verify(userRepository, times(1)).findUserByEmail(mockUser.getEmail());
    verify(userRepository, times(0)).save(mockUser);
  }

  @Test
  void execute_ShouldReturnUserRegistrationDTO_WhenUserDoesNotExist() {
    when(userRepository.findUserByEmail(mockUser.getEmail())).thenReturn(java.util.Optional.empty());

    when(passwordEncoder.encode(mockUser.getPassword())).thenReturn("encodedPassword");

    UserRegistrationDTO.builder()
        .email(mockUser.getEmail())
        .firstName(mockUser.getFirstName())
        .lastName(mockUser.getLastName())
        .build();
    when(userRepository.save(mockUser)).thenReturn(mockUser);

    UserRegistrationDTO result = createNewUserUseCase.execute(mockUser);

    assertNotNull(result);

    verify(userRepository, times(1)).save(mockUser);
    verify(userRepository, times(1)).findUserByEmail(mockUser.getEmail());
    verify(passwordEncoder, times(1)).encode("password");
  }
}
