package com.example.connection.service;

import com.example.connection.domain.vo.FreeboardVO;
import com.example.connection.mapper.FreeboardMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class FreeboardServiceImplTest {

    @Autowired
    FreeboardMapper freeboardMapper;

    @Test
    void insertFreeboard() {
        FreeboardVO freeboardVO = new FreeboardVO();

        freeboardVO.setFreeboardTitle("안녕하세요");
        freeboardVO.setFreeboardContent("안녕");
        freeboardVO.setFreeboardCategorySports("soccer");
        freeboardVO.setFreeboardCategoryPost(("free"));

        System.out.println(freeboardVO);
        System.out.println("출력 확인");

        freeboardMapper.insertFreeboard(freeboardVO);
    }
}