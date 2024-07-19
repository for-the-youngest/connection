package com.example.connection.controller;

import com.example.connection.domain.dto.ReplyListDTO;
import com.example.connection.domain.dto.ReplyWriteDTO;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.domain.dto.page.Slice;
import com.example.connection.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReplyApi {
    private final ReplyService replyService;

    // 댓글 삽입
    @PostMapping("/v3/freeboard/{freeboardNumber}/reply")
    public void replyWrite(@RequestBody ReplyWriteDTO replyWriteDTO,
                           @PathVariable("freeboardNumber") Long freeboardNumber,
                           @SessionAttribute("memberNumber") Long memberNumber) {
        replyWriteDTO.setFreeboardNumber(freeboardNumber);
        replyWriteDTO.setMemberNumber(memberNumber);
        replyService.insertReply(replyWriteDTO);

        System.out.println(freeboardNumber);
        System.out.println(memberNumber);
        System.out.println(replyWriteDTO);
    }

    // 댓글 목록 조회
    @GetMapping("/v3/freeboard/{freeboardNumber}/replys")
    public List<ReplyListDTO> replyList(@PathVariable("freeboardNumber") Long freeboardNumber) {
        return replyService.selectReplyList(freeboardNumber);
    }

    // 댓글 페이징 처리
    @GetMapping("/v4/freeboard/{freeboardNumber}/replys")
    public Slice<ReplyListDTO> replySlice(@PathVariable("freeboardNumber") Long freeboardNumber, int page){
        Slice<ReplyListDTO> slice = replyService.selectReplySlice(new Criteria(page, 5), freeboardNumber);
        System.out.println(slice);
        return slice;
    }

    // 댓글 삭제
    @DeleteMapping("/v3/freeboard/replys/{replyNumber}")
    public void replyDelete(@PathVariable("replyNumber") Long replyNumber) {
        replyService.deleteReply(replyNumber);
    }
}
