package com.example.connection.mapper;

import com.example.connection.domain.dto.ReplyListDTO;
import com.example.connection.domain.dto.ReplyWriteDTO;
import com.example.connection.domain.dto.page.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReplyMapper {
    // 댓글 삽입
    void insertReply(ReplyWriteDTO replyWriteDTO);

    // 댓글 목록 조회
    List<ReplyListDTO> selectReplyList(Long freeboardNumber);

    // 댓글 페이징 처리
    List<ReplyListDTO> selectReplySlice(@Param("criteria") Criteria criteria, @Param("freeboardNumber") Long freeboardNumber);

    // 댓글 삭제
    void deleteReply(Long freeboardNumber);
}
