package com.example.connection.mapper;


import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface LeagueMapper {

    // 게시글 리스트 조회
    List<LeagueViewDTO> leagueListViews();

    // 게시글 페이징 처리
    List<LeagueViewDTO> leagueListPaging(Criteria criteria);

    int leagueFindTotal();

    // 게시글 상세페이지 조회
    Optional<LeagueViewDTO> selectLeague(Long leaguepostNumber);

    void updateLeague(LeagueUpdateDTO leagueUpdateDTO);

    void deleteLeague(Long leaguepostNumber);

    void insertLeague(LeagueWriteDTO leagueWriteDTO);



}