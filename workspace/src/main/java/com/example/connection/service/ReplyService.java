package com.example.connection.service;

import com.example.connection.domain.dto.ReplyListDTO;
import com.example.connection.domain.dto.ReplyWriteDTO;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.domain.dto.page.Slice;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReplyService {
    // 댓글 삽입
    void insertReply(ReplyWriteDTO replyWriteDTO);

    // 댓글 목록 조회
    List<ReplyListDTO> selectReplyList(Long freeboardNumber);

    // 댓글 페이징 처리
    Slice<ReplyListDTO> selectReplySlice(Criteria criteria, Long freeboardNumber);

    // 댓글 삭제
    void deleteReply(Long freeboardNumber);
}
