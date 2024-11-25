package com.example.buget_app_transactions.controller;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController(value = "/transaction")
@RequiredArgsConstructor
@CrossOrigin
public class TransactionController {

  private final TransactionRepository transactionRepository;

  @GetMapping(value = "/{id}")
  public ResponseEntity<Optional<Transaction>> findById(@PathVariable int id) {
    System.out.println("I was here!!!");
    return ResponseEntity.ok(transactionRepository.findById(id));
  }
}
