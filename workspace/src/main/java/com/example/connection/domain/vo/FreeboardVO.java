package com.example.connection.domain.vo;

import com.example.connection.domain.dto.FileDTO;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FreeboardVO {
    private long freeboardNumber;
    private String freeboardTitle;
    private String freeboardContent;
    private LocalDateTime freeboardDate;
    private String freeboardCategorySports;
    private String freeboardCategoryPost;
    private int freeboardView;
    private FileDTO file;
    private long memberNumber;
}
