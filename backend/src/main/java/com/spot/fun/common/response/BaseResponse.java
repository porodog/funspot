package com.spot.fun.common.response;

import lombok.Getter;

@Getter
public class BaseResponse<T> {
  private final String status;
  private final String message;
  private final T data;

  private BaseResponse(String status, String message, T data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public static <T> BaseResponse<T> onSuccess(T data) {
    return new BaseResponse<>("SUCCESS", "요청이 성공적으로 처리되었습니다.", data);
  }

  public static <T> BaseResponse<T> onFailure(String message) {
    return new BaseResponse<>("FAILURE", message, null);
  }
}
