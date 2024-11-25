package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.exception.exceptions.TransactionNotFoundException;
import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DeleteTransactionUseCase {

  private final TransactionRepository transactionRepository;

  public void execute(int id) throws TransactionNotFoundException {
    var transaction = transactionRepository.findById(id)
        .orElseThrow(() -> new TransactionNotFoundException(
            "Transaction not found or was deleted before with id " + id));
    transactionRepository.delete(transaction);
  }
}
