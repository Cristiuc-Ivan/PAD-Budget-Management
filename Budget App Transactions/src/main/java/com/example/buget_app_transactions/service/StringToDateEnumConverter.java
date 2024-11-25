package com.example.buget_app_transactions.service;

import com.example.buget_app_transactions.enums.DateEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToDateEnumConverter implements Converter<String, DateEnum> {

  @Override
  public DateEnum convert(String source) {
    return DateEnum.fromValue(source);
  }
}
