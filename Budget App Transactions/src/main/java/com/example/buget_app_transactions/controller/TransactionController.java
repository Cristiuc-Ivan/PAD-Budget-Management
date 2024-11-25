package com.example.buget_app_transactions.controller;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import com.example.buget_app_transactions.service.GetTransactionUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequestMapping("/transaction")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TransactionController {

  private final GetTransactionUseCase getTransactionUseCase;

  @GetMapping(value = "/{id}")
  public ResponseEntity<Optional<Transaction>> findById(@PathVariable int id) {
    return ResponseEntity.ok(getTransactionUseCase.execute(id));
  }
}
