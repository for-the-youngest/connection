package com.example.connection.mapper;

import com.example.connection.domain.dto.ReplyListDTO;
import com.example.connection.domain.dto.ReplyUpdateDTO;
import com.example.connection.domain.dto.ReplyWriteDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<ReplyListDTO> getCommentsByPostId(Long freeboardNumber);
    void addComment(ReplyWriteDTO replyWriteDTO);
    void updateComment(ReplyUpdateDTO replyUpdateDTO);
    void deleteComment(Long replyNumber);
}
