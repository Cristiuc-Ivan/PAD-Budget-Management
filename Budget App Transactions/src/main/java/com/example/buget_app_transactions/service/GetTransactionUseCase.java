package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetTransactionUseCase {

  final private TransactionRepository transactionRepository;

  @SneakyThrows
  public Optional<Transaction> execute(Integer id){
    return Optional.ofNullable(transactionRepository.findById(id).orElseThrow(
        () -> new BadRequestException("Transaction not found")
    ));
  }
}
