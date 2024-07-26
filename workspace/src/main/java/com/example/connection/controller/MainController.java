package com.example.connection.controller;

import com.example.connection.domain.dto.FreeboardDTO;
import com.example.connection.domain.dto.MemberDTO;
import com.example.connection.domain.dto.MemberInfoDTO;
import com.example.connection.domain.vo.MemberVO;
import com.example.connection.service.FreeboardService;
import com.example.connection.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/connection")
public class MainController {

    private final FreeboardService freeboardService;
    private final MemberService memberService;

    @GetMapping()
    public String mainPage(Model model) {
        List<FreeboardDTO> freeboardList = freeboardService.selectAllByViews();
        if (freeboardList.isEmpty()) {
            System.out.println("No data found");
        } else {
            freeboardList.forEach(System.out::println);
        }
        model.addAttribute("freeboardList", freeboardList);
        return "main/main";
    }

    @GetMapping("/place")
    public String findplacePage(){
        return "place/find-place";
    }

    @GetMapping("/mypage")
    public String findMyPage(Model model, @SessionAttribute("memberNumber") Long memberNumber) {
        MemberDTO memberDTO = memberService.findByMemberNumber(memberNumber);
        List<FreeboardDTO> freeboardList = freeboardService.findAllByAuthor(memberNumber);

        if (freeboardList.isEmpty()) {
                System.out.println("No data found");
        } else {
                freeboardList.forEach(System.out::println);
        }
        model.addAttribute("memberInfo", memberDTO);
        model.addAttribute("freeboardList", freeboardList);

        return "mypage/mypage";
    }

}
