package com.example.connection.domain.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReplyVO {
    private long replyNumber;
    private LocalDateTime replyDate;
    private String replyContent;
    private long freeboardNumber;
    private long memberNumber;
}
