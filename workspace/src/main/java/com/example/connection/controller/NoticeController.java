package com.example.connection.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/connection/notice")
public class NoticeController {

    @GetMapping("/notice1")
    public String notice1() {
        return "notice/notice1";
    }

    @GetMapping("/notice2")
    public String notice2() {
        return "notice/notice2";
    }

    @GetMapping("/notice3")
    public String notice3() {
        return "notice/notice3";
    }

    @GetMapping("/notice4")
    public String notice4() {
        return "notice/notice4";
    }

}
