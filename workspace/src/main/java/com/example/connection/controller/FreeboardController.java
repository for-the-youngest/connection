package com.example.connection.controller;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.domain.dto.page.Page;
import com.example.connection.domain.vo.FreeboardVO;
import com.example.connection.service.FreeboardService;
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
@RequestMapping("/connection/board")
@RequiredArgsConstructor
public class FreeboardController {

    private final FreeboardService freeboardService;

    // 자유 게시판 게시글 리스트
    @GetMapping()
    public String FreeboardList(Criteria criteria,
                                Model model,
                                @RequestParam(required = false, defaultValue = "latest") String sort) {

        // 페이징 처리
        List<FreeboardViewDTO> boardLists = freeboardService.boardListPaging(criteria);
        int total = freeboardService.boardFindTotal();

        Page page = new Page(criteria, total);

        model.addAttribute("boardLists", boardLists);
        model.addAttribute("page", page);
        model.addAttribute("sort", sort);

        return "board/board";
    }

    // 자유 게시판 게시글 삭제
    //게시글 삭제
    @GetMapping("/remove")
    public RedirectView removeBoard(Long freeboardNumber){
        freeboardService.removeBoard(freeboardNumber);
        return new RedirectView("/connection/board");
    }

    // 자유 게시판 게시글 수정
    @GetMapping("/update")
    public String update(Long freeboardNumber, Model model) {
        FreeboardViewDTO boards = freeboardService.selectBoard(freeboardNumber);
        model.addAttribute("boards",boards);

        return "board/board-update";
    }

    @PostMapping("/update")
    public String update(FreeboardUpdateDTO freeboardUpdateDTO, @RequestParam("file") List<MultipartFile> file, RedirectAttributes redirectAttributes){
        try{
            freeboardService.updateBoard(freeboardUpdateDTO, file);
        }catch (IOException e){
            throw new RuntimeException(e);
        }

        redirectAttributes.addAttribute("boardId", freeboardUpdateDTO.getFreeboardNumber());
        return "redirect:/connection/board";
    }

    // 자유 게시판 게시글 작성
    @GetMapping("/create")
    public String boardCreate(@SessionAttribute(value="memberNumber", required=false)Long memberNumber) {
        return memberNumber == null ? "redirect:/connection/member/login" : "board/board-create";
    }

    @PostMapping("/create")
    public String boardCreate(FreeboardWriteDTO freeboardWriteDTO, @SessionAttribute(value = "memberNumber") Long memberNumber, RedirectAttributes redirectAttributes, @RequestParam("File")List<MultipartFile> files){
        freeboardWriteDTO.setMemberNumber(memberNumber);

        try {
            freeboardService.registerFreeboardWithFile(freeboardWriteDTO, files);
        }catch (IOException e){
            e.printStackTrace();
        }

        Long freeboardNumber = freeboardWriteDTO.getFreeboardNumber();
        redirectAttributes.addFlashAttribute("freeboardNumber", freeboardNumber);

        return "redirect:/connection/board/post?freeboardNumber=" + freeboardNumber;
    }

    // 자유 게시판 게시글 상세페이지
    @GetMapping("/post")
    public String boardPost(Model model, Long freeboardNumber, HttpSession session) {
        Long memberNumber = (Long)session.getAttribute("memberNumber");
        if (memberNumber == null) {
            return "redirect:/connection/member/login";
        }
        FreeboardViewDTO boards = freeboardService.selectBoard(freeboardNumber);
        freeboardService.boardViewCnt(freeboardNumber);

        model.addAttribute("boards", boards);

        return "board/board-post";
    }

    @PostMapping("/post/{freeboardNumber}")
    public String boardList( @PathVariable("freeboardNumber") Long freeboardNumber){
        freeboardService.removeBoard(freeboardNumber);
        return "redirect:/connection/board";
    }
}