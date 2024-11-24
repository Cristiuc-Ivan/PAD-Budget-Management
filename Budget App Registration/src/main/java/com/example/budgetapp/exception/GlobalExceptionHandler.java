package com.example.budgetapp.exception;

import com.example.budgetapp.exception.exceptions.UserAlreadyExistsException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<Map<String, String>> handleUserAlreadyExistsException(
      UserAlreadyExistsException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return ResponseEntity.badRequest().body(response);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(
      MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage())
    );
    return ResponseEntity.badRequest().body(errors);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<Map<String, String>> handleBadCredentialsException() {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Invalid username or password");
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }
}
