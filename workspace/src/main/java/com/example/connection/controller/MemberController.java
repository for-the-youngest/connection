package com.example.connection.controller;

import com.example.connection.domain.dto.FreeboardDTO;
import com.example.connection.domain.dto.MemberDTO;
import com.example.connection.domain.dto.MemberSessionDTO;
import com.example.connection.domain.dto.MemberUpdateDTO;
import com.example.connection.domain.vo.MemberVO;
import com.example.connection.service.FreeboardService;
import com.example.connection.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/connection/member")
public class MemberController {
    private final MemberService memberService;
    private final FreeboardService freeboardService; //변경사항임

    @GetMapping("/join")
    public String join() {
        return "/login/join";
    }

    @PostMapping("/join")
    public String join(MemberDTO memberDTO) {
        memberService.registerMember(memberDTO);
        return "redirect:/connection/member/login";
    }

    @GetMapping("/login")
    public String login(){
        return "login/login";
    }

    @PostMapping("/login")
    public String login(String memberEmail, String memberPassword, HttpSession session, RedirectAttributes redirectAttributes) {
        try {
            MemberSessionDTO sessionDTO = memberService.loginMember(memberEmail, memberPassword);
            session.setAttribute("memberNumber", sessionDTO.getMemberNumber());
            session.setAttribute("memberNickname", sessionDTO.getMemberNickname());
            return "redirect:/connection";
        } catch (IllegalStateException e) {
            redirectAttributes.addAttribute("loginFailed", true);
            return "redirect:/connection/member/login";
        }
    }

    @GetMapping("/logout")
    public RedirectView logout(HttpSession session){
        session.invalidate();
        return new RedirectView("/connection/member/login");
    }

//    @GetMapping("/info")
//    public String updateProfile(Model model, @SessionAttribute(value = "memberNumber") Long memberNumber) {
//        MemberDTO memberDTO = memberService.findByMemberNumber(memberNumber);
//        model.addAttribute("memberDTO", memberDTO);
//        return "mypage/info-edit";
//    }
//
//    @PostMapping("/info")
//    public String updateProfile(MemberUpdateDTO memberUpdateDTO, RedirectAttributes redirectAttributes) {
//        memberService.updateMember(memberUpdateDTO);
//        redirectAttributes.addAttribute("memberNumber", memberUpdateDTO.getMemberNumber());
//        return "redirect:/connection/mypage";
//    }
    @GetMapping("/info")
    public String updateProfile(Model model, @SessionAttribute(value = "memberNumber") Long memberNumber) {
        MemberDTO memberDTO = memberService.findByMemberNumber(memberNumber);
        model.addAttribute("memberDTO", memberDTO);
        return "mypage/info-edit";
    }

    @PostMapping("/info")
    public String updateProfile(@ModelAttribute MemberUpdateDTO memberUpdateDTO, @SessionAttribute(value = "memberNumber") Long memberNumber, RedirectAttributes redirectAttributes) {
        memberUpdateDTO.setMemberNumber(memberNumber);
        memberService.updateMember(memberUpdateDTO);

        // 리다이렉트할 때 memberNumber를 추가
        redirectAttributes.addAttribute("memberNumber", memberNumber);
        return "redirect:/connection/mypage";
    }

    @GetMapping("/mypage")
    public String findMyPage(Model model, @SessionAttribute("memberNumber") Long memberNumber) {
        MemberDTO memberDTO = memberService.findByMemberNumber(memberNumber);
        List<FreeboardDTO> freeboardList = freeboardService.selectByViews();

        model.addAttribute("memberInfo", memberDTO);
        model.addAttribute("freeboardList", freeboardList);

        return "mypage/mypage";
    }

    @GetMapping("/leave")
    public RedirectView leave(@SessionAttribute("memberNumber")Long memberNumber, HttpSession session){
        memberService.deleteMemberNumber(memberNumber);
        session.invalidate();
        return new RedirectView("/connection/member/login");
    }
}
