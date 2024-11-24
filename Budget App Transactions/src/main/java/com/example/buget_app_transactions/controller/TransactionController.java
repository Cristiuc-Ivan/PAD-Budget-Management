package com.example.buget_app_transactions.controller;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController(value = "/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionRepository transactionRepository;

    public ResponseEntity<Optional<Transaction>> findById(@RequestBody Transaction transaction) {
       return ResponseEntity.ok(transactionRepository.findById(transaction.getId()));
    }
}
