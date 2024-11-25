package com.example.buget_app_transactions.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TypeEnum {
  EXPENSE("Expense"),
  INCOME("Income");

  private final String value;

  TypeEnum(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @JsonCreator
  public static TypeEnum fromValue(String value) {
    for (TypeEnum type : TypeEnum.values()) {
      if (type.value.equalsIgnoreCase(value)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Unknown value: " + value);
  }
}
