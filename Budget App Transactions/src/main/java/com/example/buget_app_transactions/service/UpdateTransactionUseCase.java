package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.dto.TransactionDTO;
import com.example.buget_app_transactions.exception.exceptions.TransactionNotFoundException;
import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UpdateTransactionUseCase {
  private final TransactionRepository transactionRepository;
  private final ModelMapper modelMapper;

  public Transaction execute(Integer id, TransactionDTO transaction)
      throws TransactionNotFoundException {
    var transactionEntity = transactionRepository.findById(id)
        .orElseThrow(() -> new TransactionNotFoundException("Transaction not found with id " + id));
    modelMapper.map(transaction, transactionEntity);
    return transactionRepository.save(transactionEntity);
  }
}
