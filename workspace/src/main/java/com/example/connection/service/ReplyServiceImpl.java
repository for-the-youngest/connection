package com.example.connection.service;

import com.example.connection.domain.dto.ReplyListDTO;
import com.example.connection.domain.dto.ReplyWriteDTO;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.domain.dto.page.Slice;
import com.example.connection.mapper.ReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyMapper replyMapper;

    // 댓글 삽입
    @Override
    public void insertReply(ReplyWriteDTO replyWriteDTO) {
        replyMapper.insertReply(replyWriteDTO);
    }

    // 댓글 목록 조회
    @Override
    public List<ReplyListDTO> selectReplyList(Long freeboardNumber) {
        return replyMapper.selectReplyList(freeboardNumber);
    }

    // 댓글 페이징 처리
    @Override
    public Slice<ReplyListDTO> selectReplySlice(Criteria criteria, Long freeboardNumber) {
        List<ReplyListDTO> ReplyList = replyMapper.selectReplySlice(criteria, freeboardNumber);
        boolean hasNext = ReplyList.size() > criteria.getAmount();
        if(hasNext){
            ReplyList.remove(criteria.getAmount());
        }

        return new Slice<ReplyListDTO>(hasNext, ReplyList);
    }

    // 댓글 삭제
    @Override
    public void deleteReply(Long freeboardNumber) {
        replyMapper.deleteReply(freeboardNumber);
    }
}
