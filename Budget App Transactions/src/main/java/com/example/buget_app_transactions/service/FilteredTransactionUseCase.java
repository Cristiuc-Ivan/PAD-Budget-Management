package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.model.Transaction;
import com.example.buget_app_transactions.repository.TransactionRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FilteredTransactionUseCase {

  private final TransactionRepository transactionRepository;

  public List<Transaction> getTransactionsByDay() {
    LocalDate today = LocalDate.now();
    return transactionRepository.findAll().stream()
        .filter(transaction -> transaction.getDate().toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate()
            .isEqual(today)).collect(Collectors.toList());
  }

  public List<Transaction> getTransactionsByWeek() {
    LocalDate today = LocalDate.now();
    LocalDate startOfWeek = today.minusDays(today.getDayOfWeek().getValue() - 1); // Monday
    LocalDate endOfWeek = startOfWeek.plusDays(6); // Sunday

    return transactionRepository.findAll().stream()
        .filter(transaction -> {
          LocalDate transactionDate = transaction.getDate().toInstant()
              .atZone(ZoneId.systemDefault())
              .toLocalDate();
          return !transactionDate.isBefore(startOfWeek) && !transactionDate.isAfter(endOfWeek);
        })
        .collect(Collectors.toList());
  }

  public List<Transaction> getTransactionsByMonth() {
    LocalDate today = LocalDate.now();
    int currentMonth = today.getMonthValue();
    int currentYear = today.getYear();

    return transactionRepository.findAll().stream()
        .filter(transaction -> {
          LocalDate transactionDate = transaction.getDate().toInstant()
              .atZone(ZoneId.systemDefault())
              .toLocalDate();
          return transactionDate.getMonthValue() == currentMonth
              && transactionDate.getYear() == currentYear;
        })
        .collect(Collectors.toList());
  }

  public List<Transaction> getTransactionsByYear() {
    int currentYear = LocalDate.now().getYear();
    return transactionRepository.findAll().stream()
        .filter(transaction -> transaction.getDate().toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate().getYear() == currentYear)
        .collect(Collectors.toList());
  }

  public List<Transaction> getTransactions(String filter, String startDate, String endDate) {
    if (!"custom".equals(filter)) {
      throw new IllegalArgumentException("Invalid filter type: " + filter);
    }
    if (startDate == null || endDate == null) {
      throw new IllegalArgumentException(
          "StartDate and EndDate must not be null for custom filter.");
    }
    try {
      LocalDate start = LocalDate.parse(startDate);
      LocalDate end = LocalDate.parse(endDate);

      if (start.isAfter(end)) {
        throw new IllegalArgumentException("StartDate must not be after EndDate.");
      }

      return transactionRepository.findAll().stream()
          .filter(transaction -> {
            LocalDate transactionDate = transaction.getDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
            return !transactionDate.isBefore(start) && !transactionDate.isAfter(end);
          })
          .collect(Collectors.toList());
    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException("Invalid date format. Use 'YYYY-MM-DD'.", e);
    }
  }
}
