package com.example.budgetapp.service;

import com.example.budgetapp.model.User;
import com.example.budgetapp.repository.UserRepository;
import com.example.budgetapp.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticateUserUseCaseTest {

  @InjectMocks
  private AuthenticateUserUseCase authenticateUserUseCase;

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private JwtTokenProvider jwtTokenProvider;

  private User mockUser;

  @BeforeEach
  void setUp() {
    // Настроим пользователя для теста
    mockUser = User.builder()
        .id(1)
        .email("test@email.com")
        .password("encodedPassword")  // Это пароль после энкодинга
        .firstName("Test")
        .lastName("User")
        .build();
  }

  @Test
  void execute_ShouldReturnToken_WhenCredentialsAreValid() {
    String email = "test@email.com";
    String password = "password";  // Это реальный пароль

    // Смокируем поведение UserRepository
    when(userRepository.findUserByEmail(email)).thenReturn(Optional.of(mockUser));

    // Смокируем поведение PasswordEncoder
    when(passwordEncoder.matches(password, mockUser.getPassword())).thenReturn(true);

    // Смокируем генерацию токена
    String expectedToken = "validToken";
    when(jwtTokenProvider.createToken(email)).thenReturn(expectedToken);

    // Выполнение метода
    String actualToken = authenticateUserUseCase.execute(email, password);

    // Проверяем, что был возвращен правильный токен
    assertEquals(expectedToken, actualToken);

    // Проверяем, что репозиторий был вызван один раз
    verify(userRepository, times(1)).findUserByEmail(email);
    verify(passwordEncoder, times(1)).matches(password, mockUser.getPassword());
    verify(jwtTokenProvider, times(1)).createToken(email);
  }

  @Test
  void execute_ShouldThrowBadCredentialsException_WhenUserNotFound() {
    String email = "invalid@email.com";
    String password = "password";

    // Смокируем поведение UserRepository для несуществующего пользователя
    when(userRepository.findUserByEmail(email)).thenReturn(Optional.empty());

    // Выполнение метода и проверка выбрасывания исключения
    BadCredentialsException thrown = assertThrows(
        BadCredentialsException.class,
        () -> authenticateUserUseCase.execute(email, password)
    );

    assertEquals("Invalid username or password", thrown.getMessage());

    // Проверяем, что репозиторий был вызван один раз
    verify(userRepository, times(1)).findUserByEmail(email);
  }

  @Test
  void execute_ShouldThrowBadCredentialsException_WhenPasswordDoesNotMatch() {
    String email = "test@email.com";
    String password = "wrongPassword";

    // Смокируем поведение UserRepository
    when(userRepository.findUserByEmail(email)).thenReturn(Optional.of(mockUser));

    // Смокируем поведение PasswordEncoder для неправильного пароля
    when(passwordEncoder.matches(password, mockUser.getPassword())).thenReturn(false);

    // Выполнение метода и проверка выбрасывания исключения
    BadCredentialsException thrown = assertThrows(
        BadCredentialsException.class,
        () -> authenticateUserUseCase.execute(email, password)
    );

    assertEquals("Invalid username or password", thrown.getMessage());

    // Проверяем, что репозиторий и PasswordEncoder были вызваны
    verify(userRepository, times(1)).findUserByEmail(email);
    verify(passwordEncoder, times(1)).matches(password, mockUser.getPassword());
  }
}
