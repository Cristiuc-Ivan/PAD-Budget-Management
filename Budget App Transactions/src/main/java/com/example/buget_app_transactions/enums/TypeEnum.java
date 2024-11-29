package com.example.buget_app_transactions.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TypeEnum {
  EXPENSE("Expense", "Expenses"),
  INCOME("Income", "Incomes"),
  REVENUE("Revenue", "Revenues");

  private final String value;
  private final String pluralValue;

  TypeEnum(String value, String pluralValue) {
      this.value = value;
      this.pluralValue = pluralValue;
  }

  @JsonValue
  public String getValue() {
      return value;
  }

  @JsonCreator
  public static TypeEnum fromValue(String value) {
      for (TypeEnum type : TypeEnum.values()) {
          if (type.value.equalsIgnoreCase(value) || type.pluralValue.equalsIgnoreCase(value)) {
              return type;
          }
      }
      throw new IllegalArgumentException("Unknown value: " + value);
  }
}