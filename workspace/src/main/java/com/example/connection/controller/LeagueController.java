package com.example.connection.controller;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.domain.dto.page.Page;
import com.example.connection.domain.vo.FreeboardVO;
import com.example.connection.service.FreeboardService;
import com.example.connection.service.LeagueService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/connection/league")
@RequiredArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;

    @GetMapping()
    public String LeagueList(Criteria criteria, Model model, @RequestParam(required = false, defaultValue = "latest") String sort) {
        List<LeagueListDTO> leagueList = leagueService.findLeaguepostAll(criteria);
        int total = leagueService.findTotal();
        Page page = new Page(criteria, total);

        model.addAttribute("leagueList", leagueList);
        model.addAttribute("page", page);
        model.addAttribute("sort", sort);


        return "league/league";
    }

//    @GetMapping("/create")
//    public String leagueCreate(@SessionAttribute(value="memberNumber", required=false)Long memberNumber) {
//        return memberNumber == null ? "redirect:/connection/member/login" : "league/league-create";
//    }

    @GetMapping("/create")
    public String leagueCreate(@SessionAttribute(value="memberNumber", required=false)Long memberNumber) {
        return "league/league-create";
    }

    @PostMapping("/create")
    public String leagueCreate(LeagueWriteDTO leagueWriteDTO, @SessionAttribute(value = "memberNumber") Long memberNumber, RedirectAttributes redirectAttributes){
        leagueWriteDTO.setLeaguepostNumber(memberNumber);


        Long leaguepostNumber = leagueWriteDTO.getLeaguepostNumber();
        redirectAttributes.addFlashAttribute("leaguepostNumber", leaguepostNumber);

        return "redirect:/connection/league/post?leaguepostNumber=" + leaguepostNumber;
    }

    // 자유 게시판 게시글 삭제
    //게시글 삭제
    @GetMapping("/remove")
    public RedirectView removeLeague(Long leaguepostNumber){
        leagueService.removeLeague(leaguepostNumber);
        return new RedirectView("/connection/league");
    }

    // 자유 게시판 게시글 수정
    @GetMapping("/update")
    public String update(Long leaguepostNumber, Model model) {
        LeagueViewDTO boards = leagueService.selectLeague(leaguepostNumber);
        model.addAttribute("boards",boards);

        return "league/league-update";
    }

    @PostMapping("/update")
    public String update(LeagueUpdateDTO leagueUpdateDTO, RedirectAttributes redirectAttributes){
        try{
            leagueService.updateLeague(leagueUpdateDTO);
        }catch (IOException e){
            throw new RuntimeException(e);
        }

        redirectAttributes.addAttribute("boardId", leagueUpdateDTO.getLeagueNumber());
        return "redirect:/connection/league";
    }


    // 자유 게시판 게시글 상세페이지
    @GetMapping("/post")
    public String leaguePost(Model model, Long leaguepostNumber, HttpSession session) {
        Long memberNumber = (Long)session.getAttribute("memberNumber");
        if (memberNumber == null) {
            return "redirect:/connection/member/login";
        }
        LeagueViewDTO boards = leagueService.selectLeague(leaguepostNumber);
        leagueService.leagueViewCnt(leaguepostNumber);

        model.addAttribute("boards", boards);

        return "league/league-post";
    }

    @PostMapping("/post/{leaguepostNumber}")
    public String boardList( @PathVariable("leaguepostNumber") Long leaguepostNumber){
        leagueService.removeLeague(leaguepostNumber);
        return "redirect:/connection/league";
    }
}