package com.spot.fun.sample.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Log4j2
@RestController
@RequestMapping("/api/sample")
public class SampleController {

    @GetMapping("/hello")
    public Map<String, Object> hello() {
        return Map.of("message", "hello@@");
    }
}
