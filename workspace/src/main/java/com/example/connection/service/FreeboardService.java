package com.example.connection.service;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface FreeboardService {

    // 게시글 리스트 조회
    List<FreeboardViewDTO> boardListViews();

    // 게시글 페이징 처리
    List<FreeboardViewDTO> boardListPaging(Criteria criteria);

    int boardFindTotal();

    // 게시글 상세페이지 조회
    FreeboardViewDTO selectBoard(Long freeboardNumber);

    // 게시글 조회수
    List<FreeboardDTO> selectAllByViews();

    // 마이 페이지 조회수
    List<FreeboardDTO> selectByViews();

    // 게시글 수정
    void updateBoard(FreeboardUpdateDTO freeboardUpdateDTO, List<MultipartFile> file)throws IOException;

    // 게시글 조회수 증가
    void boardViewCnt(Long freeboardNumber);

    // 게시글 삭제
    void removeBoard(Long freeboardNumber);

    // 게시글 작성
    void insertBoard(FreeboardWriteDTO freeboardWriteDTO);

    // 게시글 파일 삽입
    void registerFreeboardWithFile(FreeboardWriteDTO freeboardWriteDTO, List<MultipartFile> files) throws IOException;

    // 게시글 파일 저장
    FileDTO saveFile(MultipartFile file) throws IOException;
}
