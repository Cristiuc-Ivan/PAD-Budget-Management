package com.example.buget_app_transactions.model;

import com.example.buget_app_transactions.enums.TypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

  @NotNull(message = "User ID cant be empty")
  @Column(name = "user_id")
  private Integer userId;

  @NotNull(message = "Type of transaction cant be empty")
  private TypeEnum type;

  @NotNull(message = "Amount cant be null")
  @Column(name = "amount")
  private long amount;

  @NotNull(message = "Date cant be empty")
  @Column(name = "date")
  private Date date;

  @NotBlank(message = "Category cant be empty")
  @Column(name = "category")
  private String category;
}
