package com.example.connection.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReplyListDTO {
    private Long replyNumber;
    private LocalDate replyDate;
    private String replyContent;
    private Long freeboardNumber;
    private String memberName;
    private Long memberNumber;
}
