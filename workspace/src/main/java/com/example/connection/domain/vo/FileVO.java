package com.example.connection.domain.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FileVO {
    private long fileNumber;
    private String fileName;
    private String fileUuid;
    private long fileSize;
    private LocalDateTime uploadDate;
    private long freeboardNumber;
}
