package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetAllUserTransactionUseCase {

  private final TransactionRepository transactionRepository;

  public List<Transaction> execute(Integer userId) {
    return transactionRepository.findByUserId(userId);
  }
}
