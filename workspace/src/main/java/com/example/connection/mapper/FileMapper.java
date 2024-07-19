package com.example.connection.mapper;

import com.example.connection.domain.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FileMapper {
    void insertFile(FileDTO FileDTO);

    void deleteFile(Long freeboardNumber);

    List<FileDTO> selectList(Long freeboardNumber);
}
