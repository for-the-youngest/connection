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
public class FreeboardUpdateDTO {
    private Long freeboardNumber;
    private String freeboardTitle;
    private String freeboardContent;
    private LocalDate freeboardDate;
    private String freeboardCategorySports;
    private String freeboardCategoryPost;
    private String freeboardView;
}
