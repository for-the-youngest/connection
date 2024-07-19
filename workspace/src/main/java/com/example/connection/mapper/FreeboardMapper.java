package com.example.connection.mapper;


import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface FreeboardMapper {

    // 게시글 리스트 조회
    List<FreeboardViewDTO> boardListViews();

    // 게시글 페이징 처리
    List<FreeboardViewDTO> boardListPaging(Criteria criteria);

    int boardFindTotal();

    // 게시글 상세페이지 조회
    Optional<FreeboardViewDTO> selectBoard(Long freeboardNumber);

    // 메인 페이지 조회수
    List<FreeboardDTO> selectAllByViews();

    // 마이 페이지 조회수
    List<FreeboardDTO> selectByViews();

    // 게시글 수정
    void updateBoard(FreeboardUpdateDTO freeboardUpdateDTO);

    // 게시글 조회수 증가
    int boardViewCnt(Long freeboardNumber);

    // 게시글 삭제
    void deleteBoard(Long freeboardNumber);

    // 게시글 작성
    void insertBoard(FreeboardWriteDTO freeboardWriteDTO);
}
