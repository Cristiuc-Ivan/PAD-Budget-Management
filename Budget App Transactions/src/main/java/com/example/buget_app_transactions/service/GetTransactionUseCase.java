package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetTransactionUseCase {

  final private TransactionRepository transactionRepository;

  public Optional<Transaction> execute(Integer id) throws BadCredentialsException {
    return Optional.of(transactionRepository.findById(id)
        .orElseThrow(() -> new BadCredentialsException("Transaction not found")));
  }
}
