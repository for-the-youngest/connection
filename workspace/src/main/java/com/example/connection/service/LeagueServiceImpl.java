package com.example.connection.service;

import com.example.connection.domain.dto.*;
import com.example.connection.domain.dto.page.Criteria;
import com.example.connection.mapper.FileMapper;
import com.example.connection.mapper.FreeboardMapper;
import com.example.connection.mapper.LeagueMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final LeagueMapper leagueMapper;

    @Override
    public List<LeagueViewDTO> leagueListViews() {
        return leagueMapper.leagueListViews();
    }

    @Override
    public List<LeagueViewDTO> leagueListPaging(Criteria criteria) {
        return leagueMapper.leagueListPaging(criteria);
    }

    @Override
    public int leagueFindTotal() {
        return leagueMapper.leagueFindTotal();
    }

    @Override
    public LeagueViewDTO selectLeague(Long leaguepostNumber) {
        // 게시물 번호가 유효하지 않으면 예외를 던지기 전에 빈 Optional을 처리
        return leagueMapper.selectLeague(leaguepostNumber).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 게시물 번호"));
    }


    @Override
    public void updateLeague(LeagueUpdateDTO leagueUpdateDTO)  {
        // 게시글 업데이트
        leagueMapper.updateLeague(leagueUpdateDTO);
    }

    @Override
    public void removeLeague(Long leaguepostNumber) {
        leagueMapper.deleteLeague(leaguepostNumber);
    }


    @Override
    public Long insertLeague(LeagueWriteDTO leagueWriteDTO) {
        leagueMapper.insertLeague(leagueWriteDTO);
        return leagueWriteDTO.getLeaguepostNumber();
    }
}