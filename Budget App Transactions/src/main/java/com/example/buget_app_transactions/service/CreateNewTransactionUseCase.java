package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import com.example.buget_app_transactions.security.JwtTokenValidator;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateNewTransactionUseCase {

  private final JwtTokenValidator jwtTokenValidator;
  private final TransactionRepository transactionRepository;

  public Transaction execute(@Valid Transaction transaction, @NotNull String token) {
    Integer userId = jwtTokenValidator.getUserIdFromToken(token);
    transaction.setUserId(userId);
    return transactionRepository.save(transaction);
  }
}
