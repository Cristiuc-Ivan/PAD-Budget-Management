package com.example.buget_app_transactions.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DateEnum {
  DAY("day"),
  MONTH("month"),
  YEAR("year"),
  WEEK("week");

  private final String value;

  DateEnum(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @JsonCreator
  public static DateEnum fromValue(String value) {
    for (DateEnum type : DateEnum.values()) {
      if (type.value.equalsIgnoreCase(value)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Unknown value: " + value);
  }
}
