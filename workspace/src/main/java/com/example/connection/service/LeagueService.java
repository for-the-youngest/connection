package com.example.connection.service;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LeagueService {

    // 게시글 삭제
    void removeLeague(Long leagueNumber);

    // 게시글 상세페이지 조회
    LeagueViewDTO selectLeague(Long leaguepostNumber);

    void registerLeaguepost(LeagueWriteDTO leagueWriteDTO);

    // 게시글 수정
    void updateLeague(LeagueUpdateDTO leagueUpdateDTO)throws IOException;

    // 게시글 조회수 증가
    void leagueViewCnt(Long leaguepostNumber);

//    void registerLeagueWithFile(LeagueWriteDTO leagueWriteDTO, List<MultipartFile> files) throws IOException;

//    FileDTO saveFile(MultipartFile file) throws IOException;

    void removeLeaguepost(Long leaguepostNumber);

//    void modifyFile(FreeboardUpdateDTO freeboardUpdateDTO, List<MultipartFile> files) throws IOException;

    LeagueViewDTO findLeaguepostNum(Long leagueNumber);

    List<LeagueListDTO> findAll();

    List<LeagueListDTO> findLeaguepostAll(Criteria criteria);

    int findTotal();

    List<LeagueDTO> selectAllByViews(String leaguepostCategory);
}
