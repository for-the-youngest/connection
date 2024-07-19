package com.example.connection.controller;

import com.example.connection.domain.dto.FileDTO;
import com.example.connection.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FileApi {
    private final FileService fileService;

    @Value("${file.upload-dir:C:/upload/}")
    private String fileDir;

    @GetMapping("/v1/boards/{freeboardNumber}/files")
    public List<FileDTO> fileList(@PathVariable("freeboardNumber") Long freeboardNumber) {
        return fileService.findList(freeboardNumber);
    }

    @GetMapping("/v1/files")
    public byte[] display(String fileName) throws IOException {
        File file = new File(fileDir, fileName);
        return FileCopyUtils.copyToByteArray(file);
    }
}
