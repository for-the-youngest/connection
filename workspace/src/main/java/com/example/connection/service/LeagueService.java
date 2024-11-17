package com.example.connection.service;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LeagueService {

    // 게시글 리스트 조회
    List<LeagueViewDTO> leagueListViews();

    // 게시글 페이징 처리
    List<LeagueViewDTO> leagueListPaging(Criteria criteria);

    int leagueFindTotal();

    // 게시글 상세페이지 조회
    LeagueViewDTO selectLeague(Long leaguepostNumber);

    // 게시글 수정
    void updateLeague(LeagueUpdateDTO leagueUpdateDTO)throws IOException;


    // 게시글 삭제
    void removeLeague(Long leagueNumber);

    // 게시글 작성
    Long insertLeague(LeagueWriteDTO leagueWriteDTO);


}