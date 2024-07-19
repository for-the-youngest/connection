package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FreeboardDTO {
    private long freeboardNumber;
    private String freeboardTitle;
    private String freeboardContent;
    private LocalDateTime freeboardDate;
    private String freeboardCategorySports;
    private String freeboardCategoryPost;
    private int freeboardView;
    private String memberNickname;
    private long memberNumber;
}
