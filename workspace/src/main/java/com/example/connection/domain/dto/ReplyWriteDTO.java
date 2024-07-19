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
public class ReplyWriteDTO {
    private Long replyNumber;
    private LocalDate replyDate;
    private String replyContent;
    private Long freeboardNumber;
    private Long memberNumber;
}
