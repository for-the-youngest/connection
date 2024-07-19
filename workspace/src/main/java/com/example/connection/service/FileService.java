package com.example.connection.service;

import com.example.connection.domain.dto.FileDTO;
import com.example.connection.domain.vo.FileVO;
import com.example.connection.domain.vo.FreeboardVO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {

    void registerFile(FileDTO fileDTO);

    void removeFile(Long freeboardNumber);

    List<FileDTO> findList(Long freeboardNumber);

}
