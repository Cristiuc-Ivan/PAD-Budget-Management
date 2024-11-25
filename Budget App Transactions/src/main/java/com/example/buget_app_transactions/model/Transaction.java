package com.example.buget_app_transactions.model;

import com.example.buget_app_transactions.enums.TypeEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

  @Id
  @Column(name = "transaction_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "user_id")
  private Integer userId;

  private TypeEnum type;

  @Column(name = "amount")
  private long amount;

  @Column(name = "date")
  private Date date;

  @Column(name = "category")
  private String category;
}
