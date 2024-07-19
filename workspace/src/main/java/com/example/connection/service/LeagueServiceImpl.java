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
    public void removeLeague(Long leagueNumber) {
        leagueMapper.deleteLeaguepost(leagueNumber);
    }

    @Override
    public LeagueViewDTO selectLeague(Long leaguepostNumber) {
        return leagueMapper.selectLeague(leaguepostNumber).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 게시물 번호"));
    }

    @Override
    public void registerLeaguepost(LeagueWriteDTO leagueWriteDTO) {
        leagueMapper.insertLeaguepost(leagueWriteDTO);
    }

    @Override
    public void updateLeague(LeagueUpdateDTO leagueUpdateDTO) throws IOException {
        // 게시글 업데이트
        leagueMapper.updateLeague(leagueUpdateDTO);
        Long boardId = leagueUpdateDTO.getLeagueNumber();
    }

    // 게시글 조회수 증가
    @Override
    public void leagueViewCnt(Long leaguepostNumber) {
        leagueMapper.leagueViewCnt(leaguepostNumber);
    }


    @Override
    public void removeLeaguepost(Long leaguepostNumber) {
        leagueMapper.deleteLeaguepost(leaguepostNumber);
    }

    @Override
    public LeagueViewDTO findLeaguepostNum(Long leagueNumber) {
        return leagueMapper.selectLeaguepostNum(leagueNumber).orElseThrow(() -> new IllegalStateException("유효하지 않은 게시물 번호"));
    }

    @Override
    public List<LeagueListDTO> findAll() {
        return leagueMapper.selectAll();
    }

    @Override
    public List<LeagueListDTO> findLeaguepostAll(Criteria criteria) {
        return leagueMapper.selectLeaguepostALL(criteria);
    }

    @Override
    public int findTotal() {
        return leagueMapper.selectTotal();
    }

    @Override
    public List<LeagueDTO> selectAllByViews(String leaguepostCategory) {
        List<LeagueDTO> leagueList = leagueMapper.selectAllByViews(leaguepostCategory);

        return leagueList;
    }
}
