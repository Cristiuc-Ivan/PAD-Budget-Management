package com.example.budgetapp.controller;

import com.example.budgetapp.dto.UserAuthenticateDTO;
import com.example.budgetapp.dto.UserRegistrationDTO;
import com.example.budgetapp.model.User;
import com.example.budgetapp.service.AuthenticateUserUseCase;
import com.example.budgetapp.service.CreateNewUserUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

  private MockMvc mockMvc;

  @Mock
  private CreateNewUserUseCase createNewUserUseCase;

  @Mock
  private AuthenticateUserUseCase authenticateUserUseCase;

  @InjectMocks
  private UserController userController;

  @BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
  }

  @Test
  void createUser_ShouldReturnOk_WhenUserIsValid() throws Exception {
    var user = User.builder()
        .id(0)
        .email("test@email.com")
        .firstName("Test")
        .lastName("Test")
        .password("password")
        .build();

    var userRegistrationDTO = UserRegistrationDTO.builder()
        .email("test@email.com")
        .firstName("Test")
        .lastName("Test")
        .build();

    when(createNewUserUseCase.execute(user)).thenReturn(userRegistrationDTO);

    mockMvc.perform(post("/user/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"firstName\":\"Test\",\"lastName\":\"Test\",\"email\":\"test@email.com\",\"password\":\"password\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName").value("Test"))
        .andExpect(jsonPath("$.lastName").value("Test"))
        .andExpect(jsonPath("$.email").value("test@email.com"));

    verify(createNewUserUseCase, times(1)).execute(user);
  }

  @Test
  void login_ShouldReturnToken_WhenCredentialsAreValid() throws Exception {
    var userAuthenticateDTO = UserAuthenticateDTO.builder()
        .email("test@email.com")
        .password("password")
        .build();
    String token = "generated-token";

    when(authenticateUserUseCase.execute(userAuthenticateDTO.getEmail(), userAuthenticateDTO.getPassword()))
        .thenReturn(token);

    mockMvc.perform(post("/user/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\":\"test@email.com\",\"password\":\"password\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("generated-token"))
        .andReturn();

    verify(authenticateUserUseCase, times(1)).execute(userAuthenticateDTO.getEmail(), userAuthenticateDTO.getPassword());
  }
}
