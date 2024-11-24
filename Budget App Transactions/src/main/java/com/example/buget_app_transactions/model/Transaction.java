package com.example.buget_app_transactions.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "amount")
    private long amount;

    @Column(name = "date")
    private Date date;

    @Column(name = "category")
    private String category;
}
