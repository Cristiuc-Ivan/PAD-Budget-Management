package com.example.buget_app_transactions.repository;

import com.example.buget_app_transactions.model.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

  public List<Transaction> findByUserId(Integer userId);
}
