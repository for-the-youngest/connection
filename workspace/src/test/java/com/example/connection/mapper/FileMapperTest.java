package com.example.connection.mapper;

import com.example.connection.domain.vo.FileVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class FileMapperTest {

    @Autowired
    FileMapper fileMapper;


    @Test
    void insertFile() {
        FileVO fileVO = new FileVO();
        fileVO.setFileName("test");
        fileVO.setFileSize(6);
        fileVO.setFreeboardNumber(1);

        System.out.println(fileVO);
        System.out.println("출력 확인");

    }
}