package com.example.buget_app_transactions.repository;

import com.example.buget_app_transactions.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}