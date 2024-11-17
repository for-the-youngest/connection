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
        List<LeagueViewDTO> leagueLists = leagueService.leagueListPaging(criteria);
        int total = leagueService.leagueFindTotal();
        Page page = new Page(criteria, total);

        model.addAttribute("leagueLists", leagueLists);
        model.addAttribute("page", page);
        model.addAttribute("sort", sort);


        return "league/league";
    }

    // 리그 게시판 게시글 삭제
    //게시글 삭제
    @GetMapping("/remove")
    public RedirectView removeLeague(Long leaguepostNumber){
        leagueService.removeLeague(leaguepostNumber);
        return new RedirectView("/connection/league");
    }

    // 리그 게시판 게시글 수정
    @GetMapping("/update")
    public String update(Long leaguepostNumber, Model model) {
        LeagueViewDTO leagues = leagueService.selectLeague(leaguepostNumber);
        model.addAttribute("leagues",leagues);

        return "league/league-update";
    }


    // 리그 게시판 게시글 작성
    @GetMapping("/create")
    public String leagueCreate(@SessionAttribute(value="memberNumber", required=false)Long memberNumber) {
        return memberNumber == null ? "redirect:/connection/member/login" : "league/league-create";
    }

    @PostMapping("/create")
    public String leagueCreate(LeagueWriteDTO leagueWriteDTO,
                               @SessionAttribute(value = "memberNumber") Long memberNumber,
                               RedirectAttributes redirectAttributes) {

        leagueWriteDTO.setMemberNumber(memberNumber);

        Long leaguepostNumber = leagueService.insertLeague(leagueWriteDTO);

        if (leaguepostNumber == null) {
            throw new IllegalStateException("leaguepostNumber가 생성되지 않았습니다.");
        }

        redirectAttributes.addFlashAttribute("leaguepostNumber", leaguepostNumber);

        return "redirect:/connection/league/post?leaguepostNumber=" + leaguepostNumber;
    }

    // 자유 게시판 게시글 상세페이지
    @GetMapping("/post")
    public String leaguePost(Model model, Long leaguepostNumber, HttpSession session) {
        Long memberNumber = (Long)session.getAttribute("memberNumber");
        if (memberNumber == null) {
            return "redirect:/connection/member/login";
        }
        LeagueViewDTO leagues = leagueService.selectLeague(leaguepostNumber);

        model.addAttribute("leagues", leagues);


        return "league/league-post";
    }

    @PostMapping("/post/{leaguepostNumber}")
    public String leagueList( @PathVariable("leaguepostNumber") Long leaguepostNumber){
        leagueService.removeLeague(leaguepostNumber);
        return "redirect:/connection/league";
    }
}