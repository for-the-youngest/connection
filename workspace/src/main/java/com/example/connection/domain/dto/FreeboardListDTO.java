package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FreeboardListDTO {
    private Long freeboardNumber;
    private String freeboardTitle;
    private LocalDate freeboardDate;
    private String freeboardCategoryPost;
    private String freeboardCategorySports;
    private int freeboardView;
    private String memberNickname;
    private String memberName;
    private Long memberNumber;
    private Long fileNumber;
    private String fileUser;
    private String fileServer;
    private String fileExt;
}
