package com.example.buget_app_transactions.controller;

import com.example.buget_app_transactions.dto.TransactionDTO;
import com.example.buget_app_transactions.enums.DateEnum;
import com.example.buget_app_transactions.exception.exceptions.TransactionNotFoundException;
import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.service.CreateNewTransactionUseCase;
import com.example.buget_app_transactions.service.DeleteTransactionUseCase;
import com.example.buget_app_transactions.service.FilteredTransactionUseCase;
import com.example.buget_app_transactions.service.GetAllUserTransactionUseCase;
import com.example.buget_app_transactions.service.GetTransactionUseCase;
import com.example.buget_app_transactions.service.UpdateTransactionUseCase;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequestMapping("/transaction")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TransactionController {

  private final GetTransactionUseCase getTransactionUseCase;
  private final CreateNewTransactionUseCase createNewTransactionUseCase;
  private final GetAllUserTransactionUseCase getAllUserTransactionUseCase;
  private final DeleteTransactionUseCase deleteTransactionUseCase;
  private final UpdateTransactionUseCase updateTransactionUseCase;
  private final FilteredTransactionUseCase filteredTransactionUseCase;

  @GetMapping(value = "/{id}")
  public ResponseEntity<Optional<Transaction>> findById(@PathVariable int id)
      throws BadCredentialsException {
    return ResponseEntity.ok(getTransactionUseCase.execute(id));
  }

  @PostMapping
  public ResponseEntity<Transaction> create(@RequestBody Transaction transaction,
      @RequestHeader("Authorization") String authorizationHeader) {
    return ResponseEntity.ok(createNewTransactionUseCase.execute(transaction, authorizationHeader));
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<List<Transaction>> getAllTransactions(@PathVariable int id) {
    return ResponseEntity.ok(getAllUserTransactionUseCase.execute(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable int id)
      throws TransactionNotFoundException {
    deleteTransactionUseCase.execute(id);
    return ResponseEntity.ok("Transaction successfully deleted with id: " + id);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Transaction> update(@PathVariable int id,
      @RequestBody TransactionDTO transactionDTO)
      throws TransactionNotFoundException {
    return ResponseEntity.ok(updateTransactionUseCase.execute(id, transactionDTO));
  }

  @GetMapping
  public ResponseEntity<List<Transaction>> getAllTransactions(
      @RequestParam(required = false) DateEnum filter) {
    return switch (filter) {
      case DAY -> ResponseEntity.ok(filteredTransactionUseCase.getTransactionsByDay());
      case WEEK -> ResponseEntity.ok(filteredTransactionUseCase.getTransactionsByWeek());
      case MONTH -> ResponseEntity.ok(filteredTransactionUseCase.getTransactionsByMonth());
      case YEAR -> ResponseEntity.ok(filteredTransactionUseCase.getTransactionsByYear());
    };
  }

  @GetMapping("/transactions")
  public ResponseEntity<List<Transaction>> getTransactions(
      @RequestParam String filter,
      @RequestParam(required = false) String startDate,
      @RequestParam(required = false) String endDate) {

    try {
      List<Transaction> transactions = filteredTransactionUseCase.getTransactions(filter, startDate,
          endDate);
      return ResponseEntity.ok(transactions);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Collections.emptyList());
    }
  }
}