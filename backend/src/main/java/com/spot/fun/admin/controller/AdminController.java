package com.spot.fun.admin.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/admin")
public class AdminController {

  // 관리자 대시보드 API
  @GetMapping("/dashboard")
  @PreAuthorize("hasAuthority('ADMIN')") // ADMIN 권한만 접근 가능
  public Map<String, String> dashboard() {
    Map<String, String> response = new HashMap<>();
    response.put("message", "Welcome to the Admin Dashboard!");
    response.put("description", "This page is for administrators only.");
    return response;
  }
}