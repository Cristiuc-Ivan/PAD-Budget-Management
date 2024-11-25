package com.example.buget_app_transactions.exception;

import com.example.buget_app_transactions.exception.exceptions.TransactionNotFoundException;
import jakarta.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<Map<String, String>> handleBadCredentialsException() {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Transaction with requested ID not found");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(
      ConstraintViolationException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Validation error");
    return ResponseEntity.badRequest().body(response);
  }

  @ExceptionHandler(TransactionNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(
      TransactionNotFoundException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return ResponseEntity.badRequest().body(response);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions() {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Validation error");
    return ResponseEntity.badRequest().body(response);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> handleIllegalArgumentExceptions(
      IllegalArgumentException ex) {
    Map<String, String> response = new HashMap<>();
    response.put("error", ex.getMessage());
    return ResponseEntity.badRequest().body(response);
  }
}
