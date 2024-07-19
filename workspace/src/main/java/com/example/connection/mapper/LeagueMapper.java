package com.example.connection.mapper;


import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface LeagueMapper {
    void insertLeaguepost(LeagueWriteDTO leagueWriteDTO);

    void deleteLeaguepost(Long leaguepostNumber);

    // 게시글 조회수 증가
    int leagueViewCnt(Long leaguepostNumber);

    void updateLeague(LeagueUpdateDTO leagueUpdateDTO);

    Optional<LeagueViewDTO> selectLeaguepostNum(Long leaguepostNumber);

    List<LeagueListDTO> selectAll();

    List<LeagueListDTO> selectLeaguepostALL(Criteria criteria);

    int selectTotal();

    List<LeagueDTO> selectAllByViews(@Param("leaguepostCategory") String leaguepostCategory);

    // 게시글 상세페이지 조회
    Optional<LeagueViewDTO> selectLeague(Long leaguepostNumber);
}
