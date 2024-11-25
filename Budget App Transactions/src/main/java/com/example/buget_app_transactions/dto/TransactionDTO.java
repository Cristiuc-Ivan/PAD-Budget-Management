package com.example.buget_app_transactions.dto;

import com.example.buget_app_transactions.enums.TypeEnum;
import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TransactionDTO {

  private TypeEnum type;
  private long amount;
  private Date date;
  private String category;

}
