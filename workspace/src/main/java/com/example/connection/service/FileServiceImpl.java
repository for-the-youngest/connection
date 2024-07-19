package com.example.connection.service;

import com.example.connection.domain.dto.FileDTO;
import com.example.connection.mapper.FileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileMapper fileMapper;

    @Override
    public void registerFile(FileDTO fileDTO) {
        fileMapper.insertFile(fileDTO);
    }

    @Override
    public void removeFile(Long freeboardNumber) {
        fileMapper.deleteFile(freeboardNumber);
    }

    @Override
    public List<FileDTO> findList(Long freeboardNumber) {
        return fileMapper.selectList(freeboardNumber);
    }
}
